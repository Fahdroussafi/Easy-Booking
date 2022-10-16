import React from "react";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";

function AdminBuses() {
  const [showBusForm, setShowBusForm] = React.useState(false);

  return (
    <div className="flex justify-between">
      <PageTitle title="Buses" />
      <button
        className="btn btn-primary bg-blue-600 hover:bg-blue-800"
        onClick={() => setShowBusForm(true)}
      >
        Add Bus
      </button>
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type="add"
        />
      )}
    </div>
  );
}

export default AdminBuses;
