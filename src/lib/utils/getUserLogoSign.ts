export function getUserLogoSign<T extends { firstName?: string; lastName?: string }>(
    user?: T
): string {
    if (!user) return "U"

    let userLogoSign = "U"
    if (user.firstName || user.lastName) {
        userLogoSign = user.firstName ? user.firstName.charAt(0).toUpperCase() : ""
        userLogoSign += user.lastName ? user.lastName.charAt(0).toUpperCase() : ""
    }

    return userLogoSign
}
