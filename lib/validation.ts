const reservedUsernames = new Set(["admin", "root", "站长", "西祠堂巷", "系统"]);

export function validateUsername(username: string) {
  const normalized = username.trim();
  if (normalized.length < 3 || normalized.length > 20) {
    return "巷口 ID 需要 3-20 位。";
  }

  if (!/^[\p{Script=Han}A-Za-z0-9_]+$/u.test(normalized)) {
    return "巷口 ID 只能使用中文、英文、数字和下划线。";
  }

  if (reservedUsernames.has(normalized.toLowerCase()) || reservedUsernames.has(normalized)) {
    return "这个巷口 ID 暂不能注册。";
  }

  return null;
}
