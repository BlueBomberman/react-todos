export const toggleForm = () => {
    return (dispatch) => {
        dispatch({ type: "toggle" })
    }
}