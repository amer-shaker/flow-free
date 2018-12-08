var gridCells = [];
var color;
var lineConnectorBackgroundTempColor;
var lineConnectorBackgroundColor;
var numberOfLines = 0;
var isNextLevel = false;

//Level 1 Array
var cellClicked = [
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#d43f3a", borderColor: "#942c28" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "#942c28" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#d43f3a", borderColor: "#942c28" },

    { isClickedFlag: 0, hasCircle: 1, circleColor: "#43A047", borderColor: "#2e7031" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#1976D2", borderColor: "#115293" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "#942c28" },

    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "#942c28" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#43A047", borderColor: "#2e7031" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#1976D2", borderColor: "#115293" }
];

//Level 2 Array
var level2 = [
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#d43f3a", borderColor: "#942c28" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#43A047", borderColor: "#2e7031" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#eeec33", borderColor: "#a6a523" },

    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#1976D2", borderColor: "#115293" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#fd7f23", borderColor: "#b15818" },

    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },

    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#43A047", borderColor: "#2e7031" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#eeec33", borderColor: "#a6a523" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },

    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#d43f3a", borderColor: "#942c28" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#1976D2", borderColor: "#115293" },
    { isClickedFlag: 0, hasCircle: 1, circleColor: "#fd7f23", borderColor: "#b15818" },
    { isClickedFlag: 0, hasCircle: 0, circleColor: "", borderColor: "" }
];

gridCells = document.getElementsByClassName("cell");

//jquery Code - Code to be executed when the page is ready
$(document).ready(function () {
    // Do the Game Logic
    handleLineConnectors();
});

function handleLineConnectors() {
    //To draw the grid
    //To draw grid rows
    var size = Math.sqrt(cellClicked.length);
    for (var i = 0; i < size; i++) {
        $("#grid-div").append("<div class='row' />");
    }

    //To draw the number of cells
    var rows = document.querySelectorAll('.row');
    for (var j = 0; j < size; j++) {
        var row = rows[j];
        //To add cells to the row
        for (var k = 0; k < size; k++) {
            var cell_ID = k + "" + j + "";
            $(row).append("<div class='cell' id=" + cell_ID + " />");

            var cellDimensions = 100 / size;
            $("#" + cell_ID).css("width", cellDimensions + "%");
            $("#" + cell_ID).css("height", cellDimensions + "%");
            $("#" + cell_ID).css({ "border-radius": "8px", "margin": "2px" });
        }
    }

    //To add circles to the cells
    var flowFreeCells = document.querySelectorAll('.cell');
    for (var l = 0; l < cellClicked.length; l++) {
        if (cellClicked[l].hasCircle == 1) {
            //To give the circle backgroudColor and borderColor
            var circle = '<div class="circle" style="border: 3px solid '
                + cellClicked[l].borderColor + ';  background-color:' + cellClicked[l].circleColor + '"></div>';
            $(flowFreeCells[l]).append(circle);
        }
    }

    $(".cell").click(function (event) {

        //To get the color of the current cell
        cellColorValue = $(this).children(".circle").css("background-color");

        //Line Connector Colors
        lineConnectorColorRight = $(this).children('.line-connector-right').css("background-color");
        lineConnectorColorLeft = $(this).children('.line-connector-left').css("background-color");
        lineConnectorColorTop = $(this).children('.line-connector-up').css("background-color");
        lineConnectorColorBottom = $(this).children('.line-connector-down').css("background-color");

        var lineConnectorColor = [lineConnectorColorRight, lineConnectorColorLeft, lineConnectorColorTop, lineConnectorColorBottom];
        for (var i = 0; i < lineConnectorColor.length; i++) {
            if (typeof lineConnectorColor[i] !== "undefined")
                lineConnectorBackgroundTempColor = lineConnectorColor[i];
        }

        if (typeof cellColorValue !== "undefined" && typeof lineConnectorBackgroundTempColor === "undefined" && typeof color !== "undefined" &&
            color != cellColorValue) {
            handleWrongCellClicking();
            color = undefined;
            return;
        } else if (typeof cellColorValue !== "undefined" && typeof lineConnectorBackgroundTempColor !== "undefined" &&
            typeof lineConnectorBackgroundColor !== "undefined" && cellColorValue != lineConnectorBackgroundColor) {
            handleWrongCellClicking();
            lineConnectorBackgroundTempColor = undefined;
            lineConnectorBackgroundColor = undefined;
            return;
        } else if (typeof cellColorValue !== "undefined" && typeof color === "undefined" &&
            typeof lineConnectorBackgroundTempColor !== "undefined" &&
            typeof lineConnectorBackgroundColor === "undefined" &&
            cellColorValue == lineConnectorBackgroundTempColor) {
            handleWrongCellClicking();
            lineConnectorBackgroundTempColor = undefined;
            lineConnectorBackgroundColor = undefined;
            return;
        } else if (typeof cellColorValue !== "undefined" && typeof lineConnectorBackgroundTempColor === "undefined") {
            color = cellColorValue;
        } else if (typeof cellColorValue === "undefined" && typeof color !== "undefined" &&
            typeof lineConnectorBackgroundTempColor !== "undefined" && color != lineConnectorBackgroundTempColor &&
            lineConnectorBackgroundTempColor != lineConnectorBackgroundColor) {
            handleWrongCellClicking();
            color = undefined;
            lineConnectorBackgroundTempColor = undefined;
            lineConnectorBackgroundColor = undefined;
            return;
        } else if (typeof cellColorValue === "undefined" && typeof lineConnectorBackgroundTempColor === "undefined") {
            //color = cellColorValue;
        } else if (typeof cellColorValue === "undefined" && typeof lineConnectorBackgroundTempColor !== "undefined" &&
            typeof lineConnectorBackgroundColor !== "undefined") {
            color = lineConnectorBackgroundColor;
        } else if (typeof cellColorValue === "undefined" && typeof lineConnectorBackgroundTempColor !== "undefined") {
            lineConnectorBackgroundColor = lineConnectorBackgroundTempColor;
        } else if (typeof cellColorValue !== "undefined" && typeof lineConnectorBackgroundColor !== "undefined" && cellColorValue == lineConnectorBackgroundColor) {
            color = lineConnectorBackgroundColor;
        } else if (typeof cellColorValue !== "undefined" && typeof lineConnectorBackgroundColor !== "undefined" && cellColorValue != lineConnectorBackgroundColor) {

        }

        if (!isNextLevel) {
            //Level 1
            switch (parseInt(event.target.id)) {

                case 00: cellClicked[0].isClickedFlag = 1;
                    break;
                case 10: cellClicked[1].isClickedFlag = 1;
                    break;
                case 20: cellClicked[2].isClickedFlag = 1
                    break;
                case 01: cellClicked[3].isClickedFlag = 1;
                    break;
                case 11: cellClicked[4].isClickedFlag = 1
                    break;
                case 21: cellClicked[5].isClickedFlag = 1;
                    break;
                case 02: cellClicked[6].isClickedFlag = 1;
                    break;
                case 12: cellClicked[7].isClickedFlag = 1;
                    break;
                case 22: cellClicked[8].isClickedFlag = 1;
                    break;
            }
        } else {
            //Level 2
            switch (parseInt(event.target.id)) {

                case 00: cellClicked[0].isClickedFlag = 1;
                    break;
                case 10: cellClicked[1].isClickedFlag = 1;
                    break;
                case 20: cellClicked[2].isClickedFlag = 1
                    break;
                case 30: cellClicked[3].isClickedFlag = 1
                    break;
                case 40: cellClicked[4].isClickedFlag = 1
                    break;
                case 01: cellClicked[5].isClickedFlag = 1;
                    break;
                case 11: cellClicked[6].isClickedFlag = 1
                    break;
                case 21: cellClicked[7].isClickedFlag = 1;
                    break;
                case 31: cellClicked[8].isClickedFlag = 1;
                    break;
                case 41: cellClicked[9].isClickedFlag = 1;
                    break;
                case 02: cellClicked[10].isClickedFlag = 1;
                    break;
                case 12: cellClicked[11].isClickedFlag = 1;
                    break;
                case 22: cellClicked[12].isClickedFlag = 1;
                    break;
                case 32: cellClicked[13].isClickedFlag = 1;
                    break;
                case 42: cellClicked[14].isClickedFlag = 1;
                    break;
                case 03: cellClicked[15].isClickedFlag = 1;
                    break;
                case 13: cellClicked[16].isClickedFlag = 1;
                    break;
                case 23: cellClicked[17].isClickedFlag = 1;
                    break;
                case 33: cellClicked[18].isClickedFlag = 1;
                    break;
                case 43: cellClicked[19].isClickedFlag = 1;
                    break;
                case 04: cellClicked[20].isClickedFlag = 1;
                    break;
                case 14: cellClicked[21].isClickedFlag = 1;
                    break;
                case 24: cellClicked[22].isClickedFlag = 1;
                    break;
                case 34: cellClicked[23].isClickedFlag = 1;
                    break;
                case 44: cellClicked[24].isClickedFlag = 1;
                    break;
            }
        }

        for (var i = 0; i < cellClicked.length; i++) {
            if (i < cellClicked.length - 1 && cellClicked[i].isClickedFlag && cellClicked[i + 1].isClickedFlag) {
                if (parseInt(gridCells[i + 1].id[0]) > parseInt(gridCells[i].id[0])) {
                    drawLineConnector("right", "left", i, i + 1);
                }
            }

            //The first condition to check for the latest row to ensure that it is in the correct range
            if (i < cellClicked.length - size && cellClicked[i].isClickedFlag
                && cellClicked[i + size].isClickedFlag) {
                if (parseInt(gridCells[i + size].id[1]) > parseInt(gridCells[i].id[1])) {
                    drawLineConnector("down", "up", i, i + size);
                }
            }
        }

    });
}

function drawLineConnector(lineConnectorClassName1, lineConnectorClassName2, cellNumber1, cellNumber2) {

    var line1 = document.createElement("div");
    var line2 = document.createElement("div");

    line1.setAttribute("class", "line-connector-" + lineConnectorClassName1);
    line2.setAttribute("class", "line-connector-" + lineConnectorClassName2);

    line1.style.backgroundColor = color;
    line2.style.backgroundColor = color;

    gridCells[cellNumber1].appendChild(line1);
    gridCells[cellNumber2].appendChild(line2);

    cellClicked[cellNumber1].isClickedFlag = 0;
    cellClicked[cellNumber2].isClickedFlag = 0;

    color = undefined;
    lineConnectorBackgroundTempColor = undefined;
    lineConnectorBackgroundColor = undefined;
    numberOfLines++;

    if (numberOfLines == 6 && !isNextLevel) {
        numberOfLines = 0;
        alert("Congratulations, you won.");

        var myNode = document.getElementById("grid-div");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        isNextLevel = true;
        cellClicked = level2;
        handleLineConnectors();

    } else if (numberOfLines == 20) {
        alert("Congratulations, you won.");
    }
}

function handleWrongCellClicking() {
    //To rest the array
    for (var i = 0; i < cellClicked.length; i++) {
        cellClicked[i].isClickedFlag = 0;
    }
}