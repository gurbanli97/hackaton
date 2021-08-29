$("#datepicker").datepicker({
  todayBtn: true,
  format: "mm.dd.yyyy",
  autoclose: true,
  startDate: new Date(),
  todayHighlight: true,
  maxViewMode: 2,
});

$("#datepicker").on("change", function () {
  $("#time").html("");
  var choosenDay = $("#datepicker").val();
  $.ajax({
    method: "POST",
    url: "/appointment/check",
    data: { choosenDay },
  }).then((response) => {
    if (response.length !== 0) {
      response.forEach((hour) => {
        if (hour) {
          $("#time").append(`<option value="${hour}">${hour}</option>`);
        }
      });
    } else {
      alert("Bu gune yerler dolufdu");
    }
  });
});
