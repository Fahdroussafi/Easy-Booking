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
    <div className="m-5">
      <div className="w-[300px] border-2 text-xl font-bold border-blue-500 rounded p-[10px]">
        <Row gutter={[10, 10]}>
          {Array.from(Array(capacity).keys()).map((seat, key) => {
            let seatClass = `btn btn-circle btn-outline bg-white cursor-pointer hover:bg-blue-600`;
            selectedSeats.includes(seat + 1);
            if (selectedSeats.includes(seat + 1)) {
              seatClass = `btn btn-circle btn-outline bg-blue-500 cursor-pointer `;
            } else if (bus.seatsBooked.includes(seat + 1)) {
              seatClass = `btn btn-circle btn-outline bg-red-500 pointer-events-none cursor-not-allowed`;
            }

            return (
              <Col key={key} span={6}>
                <div className="flex justify-center items-center">
                  <div
                    className={`border-[1px] text-black p-3 ${seatClass}`}
                    onClick={() => {
                      selectOrUnselectSeat(seat + 1);
                    }}
                  >
                    {seat + 1}
                  </div>
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
