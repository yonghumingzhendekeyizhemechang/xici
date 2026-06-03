"use server";

import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { validateUsername } from "@/lib/validation";

function value(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function toLoginError(message: string): never {
  redirect(`/login?error=${encodeURIComponent(message)}`);
}

function toRegisterError(message: string): never {
  redirect(`/register?error=${encodeURIComponent(message)}`);
}

export async function registerAction(formData: FormData) {
  const username = value(formData, "username");
  const email = value(formData, "email").toLowerCase();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");
  const displayName = value(formData, "display_name") || username;

  const usernameError = validateUsername(username);
  if (usernameError) toRegisterError(usernameError);
  if (!email || !email.includes("@")) toRegisterError("请填写可用于找回暗号的邮箱。");
  if (password.length < 6) toRegisterError("暗号至少需要 6 位。");
  if (password !== confirmPassword) toRegisterError("两次暗号没有对上。");

  const supabase = await createSupabaseServerClient();
  const admin = createSupabaseAdminClient();
  if (!supabase || !admin) {
    toRegisterError("Supabase 环境变量还没配置好。");
  }

  const { data: existingUsername } = await admin
    .from("profiles")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  if (existingUsername) toRegisterError("这个巷口 ID 已经有人用了。");

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password
  });

  if (signUpError || !signUpData.user) {
    toRegisterError(signUpError?.message || "注册失败，请稍后再试。");
  }

  const { error: profileError } = await admin.from("profiles").insert({
    id: signUpData.user.id,
    username,
    display_name: displayName,
    email_verified: Boolean(signUpData.user.email_confirmed_at)
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(signUpData.user.id);
    toRegisterError(profileError.message);
  }

  redirect("/login?registered=1");
}

export async function loginAction(formData: FormData) {
  const identifier = value(formData, "identifier");
  const password = String(formData.get("password") || "");
  if (!identifier || !password) toLoginError("请填写巷口 ID 或邮箱，以及暗号。");

  const supabase = await createSupabaseServerClient();
  if (!supabase) toLoginError("Supabase 环境变量还没配置好。");

  let email = identifier.toLowerCase();
  if (!identifier.includes("@")) {
    const admin = createSupabaseAdminClient();
    if (!admin) toLoginError("服务端登录配置还没完成。");

    const { data: profile } = await admin
      .from("profiles")
      .select("id")
      .eq("username", identifier)
      .maybeSingle();

    if (!profile) toLoginError("没有找到这个巷口 ID。");

    const { data: userData, error } = await admin.auth.admin.getUserById(profile.id);
    if (error || !userData.user?.email) toLoginError("这个巷口 ID 暂时不能登录。");
    email = userData.user.email;
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) toLoginError("巷口 ID 或暗号不对。");

  redirect("/");
}

export async function logoutAction() {
  const supabase = await createSupabaseServerClient();
  if (supabase) {
    await supabase.auth.signOut();
  }
  redirect("/");
}
