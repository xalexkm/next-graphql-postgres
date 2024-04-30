const BAD_AUTH = "Not authorized to perform this action";
const LOGGED_IN = "Logged in!";
const TASKS_FETCH_FAIL = "Could not fetch the tasks";
const LOCAL_STORAGE_WRONG_DATA =
    "Wrong state structure stored in local storage! Storage cleared!";
const LOCAL_STORAGE_NO_DATA = "No tasks stored in local storage";
const TASKS_DELETE_SYNC_FAIL = "Error syncing the deleted task";
const TASKS_UPDATE_SYNC_FAIL = "Error syncing the updated task";
const TASKS_CREATE_SYNC_FAIL = "Error syncing the created task";
const TASKS_SEARCH_STRING_NOT_PROVIDED = "Search string was not provided";

const TASKS_SEARCH_FAIL = "Error while searching for tasks";

export {
    BAD_AUTH,
    TASKS_FETCH_FAIL,
    TASKS_DELETE_SYNC_FAIL,
    TASKS_CREATE_SYNC_FAIL,
    TASKS_UPDATE_SYNC_FAIL,
    TASKS_SEARCH_STRING_NOT_PROVIDED,
    LOCAL_STORAGE_WRONG_DATA,
    LOCAL_STORAGE_NO_DATA,
    LOGGED_IN,
    TASKS_SEARCH_FAIL,
};
