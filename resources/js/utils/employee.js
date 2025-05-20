export function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
}

export const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Leave", uid: "leave" },
];

export const statusColorMap = {
    active: "success",
    paused: "danger",
    leave: "warning",
};

export const columns = [
    { name: "NIK", uid: "nik", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "AGE", uid: "age", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "TEAM", uid: "team" },
    { name: "EMAIL", uid: "email" },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

export function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}
