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
          {Array.from(Array(capacity).keys()).map((seat, key) => {
            let seatClass = `cursor-pointer w-[30px] h-[30px] border-2 border-black flex justify-center items-center rounded-full `;
            selectedSeats.includes(seat + 1);
            if (selectedSeats.includes(seat + 1)) {
              seatClass = `bg-blue-500 cursor-pointer w-[30px] h-[30px] border-2 border-black flex justify-center items-center rounded-full`;
            } else if (bus.seatsBooked.includes(seat + 1)) {
              seatClass = `bg-red-500 pointer-events-none cursor-not-allowed w-[30px] h-[30px] border-2 border-black flex justify-center items-center rounded-full `;
            }

            return (
              <Col key={key} span={6}>
                <div
                  className={`seat flex items-center  justify-center border-[1px] p-3 border-solid border-gray-500 rounded-[2px] ${seatClass}`}
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
