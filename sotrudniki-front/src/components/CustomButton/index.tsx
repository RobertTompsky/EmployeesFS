import { Button, Form } from 'antd'

type Props = {
    children: React.ReactNode;
    htmlType?: "button" | "submit" | "reset" | undefined;
    onClick?: () => void;
    type?: "link" | "text" | "default" | "primary" | "dashed" | undefined;
    danger?: boolean;
    loading?: boolean;
    shape?: "default" | "circle" | "round" | undefined;
    icon?: React.ReactNode
}
const CustomButton = ({ children, htmlType, type, danger, loading, shape, icon, onClick }: Props) => {
    return (
        <Form.Item>
            <Button
                htmlType={htmlType}
                onClick={onClick}
                type={type}
                danger={danger}
                loading={loading}
                icon={icon}
                shape={shape}>
                {children}
            </Button>
        </Form.Item>
    );
};

export default CustomButton;