function count() {
    var C1, M, E, Po, H, G, B, Ph, C2, PE, result;
    C1 = Number(document.getElementById("Chi").value);
    M = Number(document.getElementById("Mat").value);
    E = Number(document.getElementById("Eng").value);
    Po = Number(document.getElementById("Pol").value);
    H = Number(document.getElementById("His").value);
    G = Number(document.getElementById("Geo").value);
    B = Number(document.getElementById("Bio").value);
    Ph = Number(document.getElementById("Phy").value);
    C2 = Number(document.getElementById("Che").value);
    PE = Number(document.getElementById("PE").value);
    result = ((G + B) * 0.4) + (PE * 2 / 3) + C1 + M + E + (Ph * 0.7) + (C2 * 0.5) + ((Po + H) * 0.6);
    document.getElementById("result").innerHTML = "总分：" + result.toFixed(2).toString();
}