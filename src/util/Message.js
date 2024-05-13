import {ElMessage} from "element-plus";

const showMessage = (value, callback, type) => {
    ElMessage({
        type: type,
        message: value,
        duration: 2000,
        onClose: () => {
            if (callback) callback()
        }
    })
}

const message = {
    success: (value, callback) => {
        showMessage(value, callback, "success")
    },
    warning: (value, callback) => {
        showMessage(value, callback, "warning")
    },
    error: (value, callback) => {
        showMessage(value, callback, "error")
    }
}
export default message
