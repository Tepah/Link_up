type Plan = {
    _id?: String,
    title: String,
    description?: String,
    date: Date,
    attending: [String],
    host: String,
};

type Incomplete = {
    _id: String,
    title: String,
    description?: String,
    schedules: [String],
    host: String,
};

type User = {
    _id: String,
    username: String,
    name: String,
    email: String,
};

type Schedule = {
    _id: String,
    userID: String,
    name: String,
    dates: Date
};
