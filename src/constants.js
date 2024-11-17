export const STATUSES = {
    NEW: "NEW",
    CURRENT: "CURRENT",
    FINISHED: "FINISHED"
};

export const BACKEND_DOMAIN = "http://localhost:7000";

export const ENDPOINTS = new Map([
    ["getAll", "/todo"],
    ["add", "/todo"],
    ["update", "/todo"],
    ["delete", "/todo"],
    ["setPriority", "/todo/change-priority"],
    ["setList", "/todo/set-list"],
]);
