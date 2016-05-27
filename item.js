/**
 * Class guarda toda la información de una modelo.
 */
class Item {

  /**
   * Constructor que carga la estructura mínima del objeto.
   */
  constructor(x, y, focus) {
    this.translatePos = [x, y];
    this.bodyItem = {};
    this.collisionItem = {};
    this.camera = focus;
    this.animationPointer = 0;
    this.spritePointer = 0;
    this.footerPix = 0;
  }

  /**
   * Carga los datos guardados de un modelo en firebase.
   * @param {Object} mod - "POJO" con los datos de animaciones.
   */
  loadItem(mod) {
    var splitAux = null;

    for (var k in mod[0]) {
      if (this.bodyItem[k] == undefined) this.bodyItem[k] = {};
      for (var n in mod[0][k]) {
        if (this.bodyItem[k][n] == undefined) this.bodyItem[k][n] = [];
        for (var l in mod[0][k][n]) {
          splitAux = l.split(",");
          this.bodyItem[k][n].push({
            'X': splitAux[0],
            'Y': splitAux[1],
            'C': mod[0][k][n][l]
          });
          if (splitAux[1] * 1 > this.footerPix) this.footerPix = splitAux[1] * 1;
        }
      }
    }

    for (var k in mod[1]) {
      if (this.collisionItem[k] == undefined) this.collisionItem[k] = {};
      for (var n in mod[1][k]) {
        if (this.collisionItem[k][n] == undefined) this.collisionItem[k][n] = [];
        for (var l in mod[1][k][n]) {
          splitAux[0] = l.split(",");
          splitAux[1] = mod[1][k][n][l].split(",");
          this.collisionItem[k][n].push({
            'X': splitAux[0][0] * 1,
            'Y': splitAux[0][1] * 1,
            'toX': splitAux[1][0] * 1,
            'toY': splitAux[1][1] * 1
          });
        }
      }
    }
  }

  /**
   * Calcula el pixel mas bajo.
   * @return {number} pix - El valor mas bajo de y las animaciones.
   */
  calcFooterPix() {
    return this.footerPix + this.translatePos[1];
  }
}
