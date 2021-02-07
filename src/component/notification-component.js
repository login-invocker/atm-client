import { Button, notification, Space } from 'antd';

const openNotificationWithIcon = props => {
  notification[props.type]({
    message: props.message,
    description: props.description
 });
};


export default openNotificationWithIcon