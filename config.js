$config = 'fraction'
function setFractionConfig() {
    if (config == 'fraction') return
    const nameTabs = document.getElementsByClassName("th clNames")
    const nameTabArr = Array.from(nameTabs)

    nameTabArr.map(tab => { tab.innerText = "Фракция" })

    $('#orgBtnAddFraction').show()
    $('#orgBtnAddFamily').hide()

    $("#settingEms").val(1200)
    $("#settingTech").val(1900)
    $("#settingMilitary").val(2000)
    $("#settingSuper").val(2500)

    $('.clWin').each(function () {
        $(this).remove()
    })

    $('.clResult').each(function () {
        $(this).remove()
    })

    const matsTab = `<div class="th clWin">Победа</div>`
    const matsCell = `<div class="td clWin" id="sWin1"><span class="left"><select id="sWinCheckbox" onchange"fractionWin(this.selectedIndex)"><option>Мед</option><option>Тех</option><option>Оруж</option></span></div>`

    $('#cover #tr0').append(matsTab)
    $('#cover #tr1').append(matsCell)

    $config = 'fraction'
}

function setFamilyConfig() {
    if ($config == 'family') return

    $('.clWin').each(function () {
        $(this).remove()
    })

    const nameTabs = document.getElementsByClassName("th clNames")
    const nameTabArr = Array.from(nameTabs)
    nameTabArr.map(tab => tab.innerText = "Семья")

    const winTab = `<div class="th clWin">Победа</div>`
    const win = `<div class="td clWin" id=sWin1"><span class="left"><select id="sWinCheckbox" onchange="calculateWin(1, this.selectedIndex)" ><option>╳</option><option>✔</option></select></span></div>`;

    const resultTab = `<div class="th clResult">Итого</div>`
    const result = `<div class="td clResult" id="sResult1"><span class="left"><input id="sResultVal1" type="text" class="left" value="0" disabled/></span></div>`

    $("#settingEms").val(75000)
    $("#settingTech").val(100000)
    $("#settingMilitary").val(150000)
    $("#settingSuper").val(200000)
    $('#cover #tr0').append(winTab)

    $('#cover #tr1').append(win)

    $('#cover-results #tr0').append(resultTab)
    $('#cover-results #tr1').append(result)

    $('#orgBtnAddFraction').hide()
    $('#orgBtnAddFamily').show()

    $('#orgBtnAddFamily').click(function () {
        $rows++;
        $fractions++;
        $btnDel = '<span class="sBtn mousehand" onclick="deleteFraction(' + $rows + ');">-</span>'
        $btnUp = '<span class="sBtn btnSmall mousehand" onclick="upFraction(' + $rows + ');">▲</span>';
        $btnDown = '<span class="sBtn btnSmall mousehand" onclick="downFraction(' + $rows + ');">▼</span>';
        s = '<div class="tr" id="tr' + $rows + '">';
        s = s + '<div class="td clNums" id="sNum' + $rows + '"><span class="sDigit">' + $rows + '</span>' + $btnDel + $btnUp + $btnDown + '</div>';
        s = s + `<div class="td clNames" id="sName${$rows}"><span class="left"><input oninput="setFractionName(${$rows}, ${$rows})" id="sNameVal${$rows}" type="text" class="left" value=""/></span></div>`;
        s = s + `<div class="td clEms" id="sEms${$rows}"><span class="left"><input oninput="calculate('sEmsVal${$rows}', 'rEmsVal${$rows}', ${$rows})" id="sEmsVal${$rows}" type="text" class="left" value="0"/></span></div>`;
        s = s + `<div class="td clTech" id="sTech${$rows}"><span class="left"><input oninput="calculate('sTechVal${$rows}', 'rTechVal${$rows}', ${$rows})" id="sTechVal${$rows}" type="text" class="left" value="0"/></span></div>`;
        s = s + `<div class="td clMilitary" id="sMilitary${$rows}"><span class="left"><input oninput="calculate('sMilitaryVal${$rows}', 'rMilitaryVal${$rows}', ${$rows})" id="sMilitaryVal${$rows}" type="text" class="left" value="0"/></span></div>`;
        s = s + `<div class="td clSuper" id="sSuper${$rows}"><span class="left"><input oninput="calculate('sSuperVal${$rows}', 'rSuperVal${$rows}', ${$rows})" id="sSuperVal${$rows}" type="text" class="left" value="0"/></span></div>`;
        s = s + `<div class="td clWin" id=sWin1"><span class="left"><select id="sWinCheckbox" onchange="calculateWin(${$rows}, this.selectedIndex)" ><option>╳</option><option>✔</option></select></span></div>`;
        s = s + `</div>`;
        $('#cover').append(s);

        r = '<div class="tr" id="tr' + $rows + '">';
        r = r + `<div class="td clNums" id="rNum${$rows}"><span class="sDigit2">${$rows}</span>${$btnDel}${$btnUp}${$btnDown}</div>`;
        r = r + `<div class="td clNames" id="rName${$rows}"><span class="left"><input disabled type="text" id="rNameVal${$rows}" class="left" value=""/></span></div>`;
        r = r + `<div class="td clEms" id="rEms${$rows}"><span class="left"><input id="rEmsVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clTech" id="rTech${$rows}"><span class="left"><input id="rTechVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clMilitary" id="rMilitary${$rows}"><span class="left"><input id="rMilitaryVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clSuper" id="rSuper${$rows}"><span class="left"><input id="rSuperVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clResult" id="sResult${$rows}"><span class="left"><input id="sResultVal${$rows}" type="text" class="left" value="0" disabled/></span></div>`
        r = r + '</div>';

        $('#cover-results').append(r)
        renum()
    })
    $config = 'family'
}

function loadConfig() {
    $('#config').val() == 'Фракционный' ? setFractionConfig() : setFamilyConfig()
}