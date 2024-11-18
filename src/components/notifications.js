import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";

import { Toast, ToastHeader, ToastBody } from "reactstrap";

const NotificationsManager = () => {

  const notification = useSelector((state)=>state.generals.notifications);
  const [list, setList] = useState([]);

  useEffect(()=>{
    if(notification.length > 0){
      addNotification(notification[notification.length-1])
    }
  },[notification])

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      type: notification.type,
      title: notification.title,
      message: notification.message
    };
    setList(prevList => [...prevList, newNotification]);
    setTimeout(() => {
      setList(prevList =>
        prevList.filter(notification => notification.id !== newNotification.id)
      );
    }, 5000);
  };

  const removeNotification = (id) => {
    setList(prevList =>
      prevList.filter(notification => notification.id !== id)
    );
  };

  return(
    <div className="toast-container position-fixed top-0 end-0 p-3">
      {list && list.length > 0 && list.map((notification, index) => {
        if(notification.title === ""){
          return (
            <Toast className={`custom--toast bg-${notification.type}`} key={index}>
              <div className="d-flex">
                <ToastBody className="toast--body">
                  {notification.message}
                </ToastBody>
                <button
                  type="button"
                  onClick={() => { removeNotification(notification.id) }}
                  className="btn-close me-2 m-auto"
                  data-bs-dismiss="toast"
                  aria-label="Close"/>
              </div>
            </Toast>
          )
        }else{
          return (
            <Toast className="custom--toast" key={index}>
              <ToastHeader
                className={`custom--toast--header bg-${notification.type}`}
                toggle={() => { removeNotification(notification.id) }}>
                {notification.title}
              </ToastHeader>
              <ToastBody className="custom--toast--body">
                {notification.message}
              </ToastBody>
            </Toast>
          )
        }
      })}
    </div>
  )
}

export default NotificationsManager;