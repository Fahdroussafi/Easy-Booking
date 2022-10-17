import React from "react";
import { Row, Col } from "antd";

function SeatSelection({ selectedSeats, setSelectedSeats, bus }) {
  const capacity = bus.capacity;

  const selectOrUnselectSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  return (
    <div>
      <div className="w-[300px] border-2 border-black p-[10px] ">
        <Row gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((seat) => {
            let seatClass = ``;
            if (selectedSeats.includes(seat + 1)) {
              seatClass = `bg-blue-600`;
            }
            return (
              <Col span={6}>
                <div
                  className={`flex items-center justify-center border-[1px] p-3 border-solid border-gray-500 rounded-[2px] cursor-pointer ${seatClass}`}
                  onClick={() => {
                    selectOrUnselectSeat(seat + 1);
                  }}
                >
                  {seat + 1}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default SeatSelection;
