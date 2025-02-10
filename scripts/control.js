import { setTextControlWdw } from "./setText.js"
import { getList, updateList, getLang, setControlCurrentTab, getControlCurrentTab } from "./storageWorker.js"
import { getPrettyThreatType, getPrettyDate } from "./prettyData.js";

console.log('tut')

document.addEventListener("DOMContentLoaded", async () => {
    const whiteListBtn = document.getElementById("white-list-btn");
    const historyBtn = document.getElementById("history-btn");
    const whiteList = document.getElementById("white-list");
    const history = document.getElementById("history");
    const historyTable = document.getElementById("history-table");
    const div = document.getElementById("div-white-list");

    // --------------------------------------- init text ----------------------------------------

    let res = await getLang();
    const lang = (res == "ru-RU" || res == "ru") ? "ru" : "eng";
    setTextControlWdw(lang);

    // ------------------------------------ tabs switching ---------------------------------------

    async function switchToTab(windowName) {
        await setControlCurrentTab(windowName);

        if (windowName === "white-list") {
            whiteList.style.display = "block";
            div.style.display = "block"
            history.style.display = "none";

            whiteListBtn.style.border = "3px solid white";
            historyBtn.style.border = "3px solid #334251"

            whiteListBtn.classList.add("active");
            historyBtn.classList.remove("active");

        } else if (windowName === "history") {
            history.style.display = "block";
            div.style.display = "none"
            whiteList.style.display = "none";

            whiteListBtn.style.border = "3px solid #334251";
            historyBtn.style.border = "3px solid white"

            historyBtn.classList.add("active");
            whiteListBtn.classList.remove("active");
        }
    };

    whiteListBtn.addEventListener("click", async () => await switchToTab("white-list"));
    historyBtn.addEventListener("click", async () => await switchToTab("history"));

    // ---------------------------------------- init tab ----------------------------------------

    await switchToTab(await getControlCurrentTab());

    // *************************************** white list ***************************************

    // ------------------------------------------ init ------------------------------------------
    function displayNewItemWL(txtValue, id) {
        let newItem = document.createElement('li');
        newItem.setAttribute("class", "white-list-item");

        let spn = document.createElement('span');
        spn.setAttribute("class", "white-list-item-text");
        spn.textContent = txtValue;

        let delBtn = document.createElement('button');
        delBtn.setAttribute("id", "del" + (id).toString());
        delBtn.setAttribute("class", "delete-btn");
        delBtn.textContent = (lang == "ru") ? "Удалить" : "Remove";

        newItem.appendChild(spn);
        newItem.appendChild(delBtn);

        whiteList.appendChild(newItem);
    }

    function displayWhiteList(list) {
        for (let i = 0; i < list.length; i++) {
            displayNewItemWL(list[i], i + 1);
        }
    }

    displayWhiteList(await getList("whiteList"));

    // ------------------------------------------ add ------------------------------------------

    function checkIfDomain(str) {
        try {
            let url = new URL("https://" + str);
            if (!(url.host === str)) {
                return false;
            }
            return true;

        } catch (err) {
            return false;
        }
    }

    async function addToWhiteList(elem) {
        let list = await getList("whiteList");

        list.push(elem);
        await updateList("whiteList", list);
    }

    document.getElementById("white-list-adder-save-btn").onclick = async () => {
        let ntext;
        let input = document.getElementById("white-list-adder")
        let input_value = input.value.trim();

        if (!checkIfDomain(input_value)) {
            // notification
            ntext = (lang == "ru") ? "Введен некорректный домен" : "Invalid domain entered";
            alert("\n" + ntext);
            return;
        }

        let whiteListItems = whiteList.querySelectorAll('ul li span');
        let isUnique = true;
        console.log(whiteListItems)

        for (let item of whiteListItems) {
            if (item.textContent == input_value) {
                isUnique = false;
                break;
            }
        }

        if (!isUnique) {
            // notification
            ntext = (lang == "ru") ? "Домен уже есть в списке" : "The domain is already in the list";
            alert("\n" + ntext);
            return;
        }

        await addToWhiteList(input_value);

        displayNewItemWL(input_value, whiteList.childElementCount + 1);
        input.value = "";
    }

    // ------------------------------------------ search ------------------------------------------

    document.getElementById("white-list-finder").onkeyup = () => {
        let li = whiteList.querySelectorAll("ul li");

        let input_value = document.getElementById("white-list-finder").value.toLowerCase().trim();
        let cntNotHidden = 0;

        for (let i = 0; i < li.length; i++) {
            let cur = li[i];
            let txtValue = cur.getElementsByTagName("span")[0].textContent;

            if (txtValue.toLowerCase().indexOf(input_value) > -1) {
                cur.style.display = "";
                cntNotHidden++;

            } else {
                cur.style.display = "none";
            }
        }
    }

    // ------------------------------------------ rm ------------------------------------------

    async function delFromWhiteList(elem) {
        let list = await getList("whiteList")
        let i = 0;
        for (i; i < list.length; i++) {
            if (list[i] == elem) {
                break;
            }
        }
        list.splice(i, 1);
        await updateList("whiteList", list);
    }

    document.addEventListener('click', async (ev) => {
        if (!ev.target.classList.contains('delete-btn'))
            return;
        let id = ev.target.id;
        let elem = document.getElementById(id);
        let parent = elem.parentElement;

        let txtValue = parent.getElementsByTagName("span")[0].textContent;

        // notification
        let ntext = (lang == "ru") ? "Вы уверены, что хотите удалить домен" : "Are you sure you want to delete domain";
        let isSure = confirm(`\n ${ntext}: ${txtValue}?`);
        if (!isSure)
            return;

        parent.remove();
        await delFromWhiteList(txtValue);
    });


    // *************************************** block history ***************************************


    // ------------------------------------------ sort ------------------------------------------

    function dateCmp(fullDateA, fullDateB) { // ? (fullDateA < fullDateB)
        let [timeArrA, dateArrA] = fullDateA.split(' ');
        let [timeArrB, dateArrB] = fullDateB.split(' ');

        let [hA, minA] = timeArrA.split(':');
        let [hB, minB] = timeArrB.split(':');

        let [dA, mA, yA] = dateArrA.split('.');
        let [dB, mB, yB] = dateArrB.split('.');

        let res = (yA != yB) ? yA < yB :
            (mA != mB) ? mA < mB :
                (dA != dB) ? dA < dB :
                    (hA != hB) ? hA < hB :
                        (minA != minB) ? minA < minB : 0;

        return res;
    }

    function rowsCmp(rowA, rowB, option) {
        let dateA = rowA.cells[0].textContent;
        let dateB = rowB.cells[0].textContent;

        let res = dateCmp(dateA, dateB);

        if (option == "older-date") {
            return (res ? -1 : 1)
        }
        return (res ? 1 : -1);
    }

    function sortByDate() {
        let select = document.getElementById("history-sort");
        let selectedOption = select.options[select.selectedIndex].value;

        let sortedRows = Array
            .from(historyTable.rows)
            .slice(1)
            .sort((rowA, rowB) => rowsCmp(rowA, rowB, selectedOption));

        historyTable.tBodies[0].append(...sortedRows);
    }

    document.getElementById("history-sort").onchange = () => sortByDate();

    // ------------------------------------------ init ------------------------------------------

    function displayBlockHistory(list) {
        let tableElems = historyTable.querySelectorAll("table tbody")[0];
        tableElems.innerHTML = '';

        for (let i = 0; i < list.length; i++) {
            let newItem = document.createElement('tr');

            let tdDate = document.createElement('td');
            tdDate.setAttribute("class", "history-table-data");
            tdDate.textContent = getPrettyDate(list[i][0]);

            let tdURL = document.createElement('td');
            tdURL.setAttribute("class", "history-table-url");
            tdURL.textContent = list[i][1];

            let tdReason = document.createElement('td');
            tdReason.setAttribute("class", "history-table-reason");
            tdReason.textContent = getPrettyThreatType(list[i][2], lang);

            newItem.append(tdDate);
            newItem.append(tdURL);
            newItem.append(tdReason);

            tableElems.appendChild(newItem);
        }

        sortByDate();
    }

    displayBlockHistory(await getList("blockHistory"))

    // ------------------------------------------ clear ------------------------------------------

    document.getElementById("history-clear-btn").onclick = async () => {
        // notification
        let ntext = (lang == "ru") ? "Вы уверены, что хотите очистить историю блокировки?" : "Are you sure you want to clear block history?";
        let isSure = confirm(`\n` + ntext);
        if (!isSure) {
            return;
        }

        let tableElems = historyTable.querySelectorAll("table tbody")[0];
        tableElems.innerHTML = '';

        await updateList("blockHistory", []);
    }

    // ------------------------------------------ filter ------------------------------------------

    function filterBlockHistory() {
        let searchInput = document.getElementById("history-search");
        let searchTxt = searchInput.value.toLowerCase().trim();

        let select = document.getElementById("history-reason-sort");
        let reason = select.options[select.selectedIndex].textContent;

        for (var i = 1; i < historyTable.rows.length; i++) {
            let isReasonCorrect = (historyTable.rows[i].cells[2].innerHTML == reason || (reason == "Любая причина" || reason == "Any reason"));
            let isURLAvailable = (historyTable.rows[i].cells[1].innerHTML.toLowerCase().indexOf(searchTxt) > -1);

            if (isReasonCorrect && isURLAvailable) {
                historyTable.rows[i].style.display = "";

            } else {
                historyTable.rows[i].style.display = "none";
            }
        }
    }

    document.getElementById("history-reason-sort").onchange = () => filterBlockHistory();

    document.getElementById("history-search").onkeyup = () => filterBlockHistory()

    // ---------------------------------- download blockHistory -----------------------------------

    function dataToCSV(data) {
        return "date,url,reason\n" + data.map(e => e.join(",")).join("\n");
    }

    function dataToJSON(data) {
        let result = {};

        for (let i = 0; i < data.length; i++) {
            let arr = data[i];

            result[i] = {
                date: arr[0],
                url: arr[1],
                reason: arr[2]
            };
        }

        return JSON.stringify(result);
    }

    async function downloadBlockHistory(type) {
        let blockHistory = await getList("blockHistory");
        // notification
        if (blockHistory.length == 0) {
            let ntext = (lang == "ru") ? "История блокировок пуста" : "Block history is empty";
            alert("\n" + ntext)
            return;
        }

        let data;

        if (type == "csv") {
            data = dataToCSV(blockHistory);

        } else {
            data = dataToJSON(blockHistory);
        }

        const blob = new Blob([data], { type: type });

        const link = document.createElement('a');

        link.href = URL.createObjectURL(blob);
        link.download = 'blockingReport.' + type;
        link.click();

        URL.revokeObjectURL(link.href);
    }

    document.getElementById("history-download-btn").onclick = async () => {
        let select = document.getElementById("download-selection-sort");
        let selectedOption = select.options[select.selectedIndex].id;

        await downloadBlockHistory(selectedOption);
    }
});