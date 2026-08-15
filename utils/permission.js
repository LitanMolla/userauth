const permissionList = [
    {
        role: "admin",
        permission: [
            "all",
        ],
    },
    {
        role: "moderator",
        permission: [
            "read",
            "update",
            "delete",
            "manage_content",
        ],
    },
    {
        role: "user",
        permission: [
            "read",
            "create",
            "update",
        ],
    },
];

module.exports = permissionList

