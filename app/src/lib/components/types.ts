
type Plan = {
    title: String,
    description?: String,
    date: String,
    // Create attending into IDs of users
    attending: [String],
    host: String,
};

type User = {
    id: String,
    name: String,
    email: String,
    plans: [String],
};
