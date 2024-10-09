import { STATUSES } from "./constants";


const testTodos = [
    {
        id: 1,
        title: "Test1",
        description: "Test description",
        statuses: STATUSES.NEW
    },
    {
        id: 2,
        title: "Test2",
        description: "Test description",
        statuses: STATUSES.NEW
    },
    {
        id: 3,
        title: "Test3",
        description: "Test description",
        status: STATUSES.NEW
    }
];

const testCurrentTodos = [
    {
        id: 4,
        title: "Test4",
        description: "Test description",
        status: STATUSES.CURRENT
    }
];

const testCompletedTodos = [
    {
        id: 5,
        title: "Test5",
        description: "Test description",
        status: STATUSES.FINISHED
    },
];

export { testTodos, testCurrentTodos, testCompletedTodos };
