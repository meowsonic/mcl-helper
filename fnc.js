$(document).ready(function () {
    $rows = $fractions = 1
    $select = '<input>'
    $winSum = 0

    for ($i = 1; $i <= 3; $i++) { $("#content #tab" + $i).hide(); }
    $('#orgBtnAddFamily').hide()
    $("#tabs li:first").attr("id", "current"); // Активируем первую закладку
    $("#content #tab1").fadeIn(); // Выводим содержание

    $('#tabs a').click(function (e) {
        e.preventDefault();
        //Скрыть все содержание
        for ($i = 1; $i <= 3; $i++) { $("#content #tab" + $i).hide(); }
        $("#tabs li").attr("id", ""); //Сброс ID
        $(this).parent().attr("id", "current"); // Активируем закладку
        $('#' + $(this).attr('title')).fadeIn(); // Выводим содержание текущей закладки
    });

    $('#orgBtnAddFraction').click(function () {
        $rows++;
        $fractions++;
        $val = '0';
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
        s = s + `</div>`;
        $('#cover').append(s);

        r = '<div class="tr" id="tr' + $rows + '">';
        r = r + `<div class="td clNums" id="rNum${$rows}"><span class="sDigit2">${$rows}</span>${$btnDel}${$btnUp}${$btnDown}</div>`;
        r = r + `<div class="td clNames" id="rName${$rows}"><span class="left"><input disabled type="text" id="rNameVal${$rows}" class="left" value=""/></span></div>`;
        r = r + `<div class="td clEms" id="rEms${$rows}"><span class="left"><input id="rEmsVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clTech" id="rTech${$rows}"><span class="left"><input id="rTechVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clMilitary" id="rMilitary${$rows}"><span class="left"><input id="rMilitaryVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + `<div class="td clSuper" id="rSuper${$rows}"><span class="left"><input id="rSuperVal${$rows}" disabled type="text" class="left" value="0"/></span></div>`;
        r = r + '</div>';

        $('#cover-results').append(r)
        renum()
    })
})

function renum() {
    n = 1;
    s = 1;
    $('.sDigit').each(function () {
        $(this).html(n++);
    })

    $('.sDigit2').each(function () {
        $(this).html(s++);
    })
}

function upFraction(n) {
    if ('tr0' != $('#tr' + n).prev().attr('id'))
        $('#tr' + n).prev().before($('#tr' + n))
    renum()
}

function downFraction(n) {
    if (undefined != $('#tr' + n).next().attr('id'))
        $('#tr' + n).next().after($('#tr' + n));
    renum();
}

function deleteFraction(n) {
    const trs = document.getElementsByClassName('tr')
    const arr = Array.from(trs)

    arr.filter(t => t.id === 'tr' + n).forEach(e => e.remove())
    renum()
}

function setFractionName(id) {
    $('#rNameVal' + id).val($('#sNameVal' + id).val())
}

function calculate(first, second, id) {
    switch (second.replace(/[0-9]/g, '')) {
        case 'rEmsVal':
            $(`#${second}`).val($(`#${first}`).val() * $(`#settingEms`).val())
            $(`#sResultVal${id}`).val(parseInt($(`#rEmsVal${id}`).val()) + parseInt($(`#rTechVal${id}`).val()) + parseInt($(`#rSuperVal${id}`).val()) + parseInt($(`#rMilitaryVal${id}`).val()) + $winSum)
            break
        case 'rTechVal':
            $(`#${second}`).val($(`#${first}`).val() * $(`#settingTech`).val())
            $(`#sResultVal${id}`).val(parseInt($(`#rEmsVal${id}`).val()) + parseInt($(`#rTechVal${id}`).val()) + parseInt($(`#rSuperVal${id}`).val()) + parseInt($(`#rMilitaryVal${id}`).val()) + $winSum)
            break
        case 'rMilitaryVal':
            $(`#${second}`).val($(`#${first}`).val() * $(`#settingMilitary`).val())
            $(`#sResultVal${id}`).val(parseInt($(`#rEmsVal${id}`).val()) + parseInt($(`#rTechVal${id}`).val()) + parseInt($(`#rSuperVal${id}`).val()) + parseInt($(`#rMilitaryVal${id}`).val()) + $winSum)
            break
        case 'rSuperVal':
            $(`#${second}`).val($(`#${first}`).val() * $(`#settingSuper`).val())
            $(`#sResultVal${id}`).val(parseInt($(`#rEmsVal${id}`).val()) + parseInt($(`#rTechVal${id}`).val()) + parseInt($(`#rSuperVal${id}`).val()) + parseInt($(`#rMilitaryVal${id}`).val()) + $winSum)
            break
    }
}

function calculateWin(id, status) {
    (status == 1) ? $winSum = 500000 : $winSum = 0
    $(`#sResultVal${id}`).val($winSum + parseInt($(`#rEmsVal${id}`).val()) + parseInt($(`#rTechVal${id}`).val()) + parseInt($(`#rSuperVal${id}`).val()) + parseInt($(`#rMilitaryVal${id}`).val()))
}