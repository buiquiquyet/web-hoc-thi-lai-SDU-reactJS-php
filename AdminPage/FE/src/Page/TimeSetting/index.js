import classNames from "classnames/bind";
import styles from "./TimeSetting.module.scss";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import * as Services from "./../../apiServices/time";
const cx = classNames.bind(styles);

function TimeSetting() {
  const [startTimeRef, setStartTimeRef] = useState(null);
  const [closeTimeRef, setCloseTimeRef] = useState(null);
  const [dataTime, setDataTime] = useState([]);
  const handleSetTime = async () => {
    if (startTimeRef === null || closeTimeRef === null) {
      NotificationManager.error("Chọn đủ thông tin", "Lỗi", 2000);
    } else {
      const startTime = new Date(startTimeRef);
      const closeTime = new Date(closeTimeRef);
      if (closeTime.getTime() <= startTime.getTime()) {
        NotificationManager.error(
          "Thời gian hết hạn phải lớn hơn thời gian bắt đầu",
          "Lỗi",
          2000
        );
      } else {
        await createTime();
        await fecthTime();
      }
    }
  };
  const changeStart = (value) => {
    setStartTimeRef(value.target.value);
  };
  const changeClose = (value) => {
    setCloseTimeRef(value.target.value);
  };
  const createTime = async () => {
    const formData = new FormData();
    console.log(startTimeRef);
    formData.append("time_start", startTimeRef);
    formData.append("time_close", closeTimeRef);
    const rs = await Services.createTime(formData);
    console.log(rs);
    if (rs === "success") {
      NotificationManager.success(
        "Tạo thời gian thành công",
        "Thành công",
        2000
      );
    } else {
      NotificationManager.error("Tạo thời gian không thành công", "Lỗi", 2000);
    }
  };
  const convertDate = (date) => {
    var parts = date.split("-");
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];

    const newDateString = day + "-" + month + "-" + year;
    return newDateString;
  };
  const fecthTime = async () => {
    const rs = await Services.getTime();
    if (rs) {
      setDataTime(rs.time);
    } else setDataTime([]);
  };
  useEffect(() => {
    fecthTime();
  }, []);
  return (
    <div className={cx("wrapper")}>
      <NotificationContainer />
      <div className={cx("app")}>
        <Form.Item
          label="Thời gian bắt đầu"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="date"
            value={startTimeRef}
            onChange={(e) => changeStart(e)}
          />
        </Form.Item>
        <Form.Item
          label="Thời gian hết hạn"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            type="date"
            value={closeTimeRef}
            onChange={(e) => changeClose(e)}
          />
        </Form.Item>
        <div
          style={{
            marginBottom: "20px",
            minWidth: "600px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" onClick={handleSetTime}>
            Cập nhật
          </Button>
        </div>
        <div>
          <table style={{ border: "1px solid #ccc", minWidth: "600px" }}>
            <thead>
              <tr className={cx("header-tr")}>
                <th>Thời gian bắt đầu</th>
                <th>Thời gian kết thúc</th>
              </tr>
            </thead>
            <tbody>
              <tr className={cx("body-tr")}>
                <th>{convertDate(dataTime[0].time_start)}</th>
                <th>{convertDate(dataTime[0].time_close)}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TimeSetting;
