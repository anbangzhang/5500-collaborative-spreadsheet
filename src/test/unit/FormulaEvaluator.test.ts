// Unit tests for FormulaEvaluator.ts

import { FormulaEvaluator } from "../../engine/FormulaEvaluator";
import SheetMemory from "../../engine/SheetMemory";
import Cell from "../../engine/Cell";
import { ErrorMessages } from "../../engine/GlobalDefinitions";


let testMemory: SheetMemory;
let recalc: FormulaEvaluator;


beforeEach(() => {
  testMemory = new SheetMemory(5, 5);
  recalc = new FormulaEvaluator(testMemory);


  const cellA1 = new Cell();
  cellA1.setFormula(["1"]);
  cellA1.setValue(1);
  cellA1.setError("");
  testMemory.getCells()[0][0] = cellA1;

  const cellA2 = new Cell();
  cellA2.setFormula(["2"]);
  cellA2.setValue(2);
  cellA2.setError("");
  testMemory.getCells()[0][1] = cellA2;

  const cellA3 = new Cell();
  cellA3.setFormula(["3"]);
  cellA3.setValue(3);
  cellA3.setError("");
  testMemory.getCells()[0][2] = cellA3;
});

describe("FormulaEvaluator", () => {
  describe("update", () => {
    describe("when the formula contains a single number", () => {
      it("returns the number", () => {
        const formula: FormulaType = ["1"];
        const memory = new SheetMemory(5, 5);

        recalc.evaluate(formula)
        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(1);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is ( 8 )", () => {
      it("returns the number", () => {
        const formula: FormulaType = ["(", "8", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(8);
        expect(error).toEqual("");
      });
    });


    describe("when the formula contains two tokens, number, operator", () => {
      it("returns the number", () => {
        const formula: FormulaType = ["1", "+"];

        recalc.evaluate(formula);
        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(1);
        expect(error).toEqual(ErrorMessages.invalidFormula);
      });
    });

    describe("when the formula contains three tokens, number, operator, number", () => {
      describe("when the operator is +", () => {
        it("returns the sum of the numbers", () => {
          const formula: FormulaType = ["1", "+", "2"];
          const memory = new SheetMemory(5, 5);
          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;

          expect(result).toEqual(3);
          expect(error).toEqual("");
        });
      });

      describe("when the operator is -", () => {
        it("returns the difference of the numbers", () => {
          const formula: FormulaType = ["1", "-", "2"];
          const memory = new SheetMemory(5, 5);
          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;

          expect(result).toEqual(-1);
          expect(error).toEqual("");
        });
      });

      describe("when the operator is *", () => {
        it("returns the product of the numbers", () => {
          const formula: FormulaType = ["1", "*", "2"];
          const memory = new SheetMemory(5, 5);
          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;

          expect(result).toEqual(2);
          expect(error).toEqual("");
        });
      });


      describe("when the operator is /", () => {
        describe("when the divisor is not zero", () => {
          it("returns the quotient of the numbers", () => {
            const formula: FormulaType = ["1", "/", "2"];

            recalc.evaluate(formula);

            let result = recalc.result;
            let error = recalc.error;

            expect(result).toEqual(0.5);
            expect(error).toEqual("");
          });
        });

        describe("when the divisor is zero", () => {
          it("returns an error", () => {
            const formula: FormulaType = ["1", "/", "0"];

            recalc.evaluate(formula);

            let result = recalc.result;
            let error = recalc.error;

            expect(result).toEqual(Infinity);
            expect(error).toEqual("#DIV/0!");
          });
        });
      });
    });

    describe(" The formula is ( )", () => {
      it("returns a syntax error", () => {
        const formula: FormulaType = ["(", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0);
        expect(error).toEqual(ErrorMessages.missingParentheses);
      });
    });

    describe("when the formula contains 8 ( ", () => {
      it("returns a syntax error", () => {
        const formula: FormulaType = ["8", "("];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;


        expect(result).toEqual(8);
        expect(error).toEqual(ErrorMessages.invalidFormula);
      });
    });

    describe("when the formula contains five tokens, number, operator, number, operator, number", () => {
      describe("when the operators are +, +", () => {
        it("returns the sum of all three numbers", () => {
          const formula: FormulaType = ["1", "+", "2", "+", "3"];

          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;
          expect(result).toEqual(6);
          expect(error).toEqual("");
        });
      });

      describe("when the operators are +, -", () => {
        it("returns the sum of the first two numbers minus the third number", () => {
          const formula: FormulaType = ["1", "+", "2", "-", "3"];
          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;

          expect(result).toEqual(0);
          expect(error).toEqual("");
        });
      });

      describe("when the operators are +, *", () => {
        it("returns the product of the second and third number added to the first number", () => {
          const formula: FormulaType = ["1", "+", "2", "*", "3"];
          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;

          expect(result).toEqual(7);
          expect(error).toEqual("");

        });
      });


      describe("when the operators are +, /", () => {
        it("returns the quotient of the second and third number added to the first number", () => {

          const formula: FormulaType = ["1", "+", "10", "/", "5"];
          recalc.evaluate(formula);

          let result = recalc.result;
          let error = recalc.error;

          expect(result).toEqual(3);
          expect(error).toEqual("");

        });
      });
    });

    describe("when the formula contains four tokens, number, operator, number, operator", () => {
      it("returns the result of the first three tokens", () => {
        const formula: FormulaType = ["1", "+", "2", "+"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(3);
        expect(error).toEqual(ErrorMessages.invalidFormula);
      }
      );
    }
    );
    describe("when the formula A1 + A1", () => {

      it("returns the number", () => {
        const formula = ["A1", "+", "A1"];

        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;
        expect(result).toEqual(2);
        expect(error).toEqual("");
      });
    });

    describe("when the formula A1 + A2", () => {
      it("returns the number", () => {
        const formula = ["A1", "+", "A2"];

        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(3);
        expect(error).toEqual("");

      });
    });

    describe("when the formula A1 + A2 + 50", () => {

      it("returns the number", () => {


        const formula = ["A1", "+", "A2", "+", "50"];

        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(53);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 1 * ) ", () => {
      it("returns the number", () => {
        const formula = ["1", "+", "+"];

        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(1);
        expect(error).toEqual(ErrorMessages.invalidFormula);
      });
    });

    describe("when the formula is 2 ^ 2", () => {
      it("returns 4", () => {
        const formula = ["#s", "2", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(4);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 2 ^ 3", () => {
      it("returns 8", () => {
        const formula = ["#d", "2", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(8);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 4 sqrt", () => {
      it("returns 2", () => {
        const formula = ["#g", "4", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(2);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 8 cqrt", () => {
      it("returns 2", () => {
        const formula = ["#h", "8", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(2);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 0 sin", () => {
      it("returns 0", () => {
        const formula = ["#k", "0", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 0 cos", () => {
      it("returns 1", () => {
        const formula = ["#l", "0", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(1);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 0 tan", () => {
      it("returns 0", () => {
        const formula = ["#w", "0", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 0 arcsin", () => {
      it("returns 0", () => {
        const formula = ["#e", "0", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 1 arccos", () => {
      it("returns 0", () => {
        const formula = ["#r", "1", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 0 arctan", () => {
      it("returns 0", () => {
        const formula = ["#t", "0", ")"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 1 / ( 15 + 5 ) x 5", () => {
      it("returns 0.25", () => {
        const formula = ["1", "/", "(", "15", "+", "5", ")", "*", "5"];
        recalc.evaluate(formula);

        let result = recalc.result;
        let error = recalc.error;

        expect(result).toEqual(0.25);
        expect(error).toEqual("");
      });
    });

    describe("when the formula is 2 ^ 2 + 4 ^ 3 + sin( 10 + 20) * 5", () => {
      it("returns 132.5", () => {
        const formula = ["#s", "2", ")", "+", "#d", "4", ")", "+", "#k", "10", "+", "20", ")", "*", "5"];
        recalc.evaluate(formula);

        let result = recalc.result; 
        let error = recalc.error;

        expect(result).toEqual(63.05985);
        expect(error).toEqual("");
      });
    });

  });

});
