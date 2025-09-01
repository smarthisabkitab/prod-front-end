export const statsData = [
  {
    title: "Total Items",
    value: "1,234",
    change: "+12%",
    changePositive: true,
  },
  {
    title: "Total Value",
    value: "$45,678",
    change: "+8%",
    changePositive: true,
  },
  {
    title: "Monthly Sales",
    value: "$12,345",
    change: "+23%",
    changePositive: true,
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "-5%",
    changePositive: false,
  },
];

export const recentActivities = [
  {
    type: "add",
    title: "New item added: Gold Ring 18K",
    time: "2 hours ago",
  },
  {
    type: "sale",
    title: "Sale completed: Gold Necklace",
    time: "4 hours ago",
  },
  {
    type: "alert",
    title: "Low stock alert: Gold Earrings",
    time: "6 hours ago",
  },
  {
    type: "update",
    title: "Inventory updated: Diamond Collection",
    time: "1 day ago",
  },
];

export const quickActions = [
  {
    title: "Manage Shops",
    path: "/shop",
    color: "bg-amber-600 hover:bg-amber-700",
  },
  {
    title: "Manage Users",
    path: "/user-management",
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    title: "Add New Item",
    path: "/add-item",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Record Sale",
    path: "/record-sale",
    color: "bg-purple-600 hover:bg-purple-700",
  },
];

export const recentSales = [
  {
    name: "Gold Ring 18K",
    details: "2 items · $450",
    status: "Completed",
  },
  {
    name: "Diamond Necklace",
    details: "1 item · $1,250",
    status: "Completed",
  },
  {
    name: "Platinum Bracelet",
    details: "1 item · $890",
    status: "Pending",
  },
];
