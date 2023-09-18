import { Alert } from "antd";


type Props = {
    message?: string
}

const ErrorMessage = ({message}: Props) => {
    if (!message) {
        return null
    }
    return <Alert type="error" message={message}/>
};

export default ErrorMessage;