let color = "";
if (bmi < 18.5) color = "blue";
else if (bmi < 25) color = "green";
else if (bmi < 30) color = "orange";
else color = "red";

document.getElementById("result").innerHTML = 
  `Your BMI is <b>${bmi}</b> (<span style="color:${color}">${category}</span>)`;
