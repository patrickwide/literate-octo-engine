const getGrade = require("../studentGradeGenerator/getGrade");

describe("getGrade", () => {
  test('returns "Invalid input. Please enter a number between 0 and 100." when mark is not a number', () => {
    expect(getGrade("not a number")).toBe(
      "Invalid input. Please enter a number between 0 and 100."
    );
  });

  test('returns "Invalid input. Please enter a number between 0 and 100." when mark is less than 0', () => {
    expect(getGrade(-10)).toBe(
      "Invalid input. Please enter a number between 0 and 100."
    );
  });

  test('returns "Invalid input. Please enter a number between 0 and 100." when mark is greater than 100', () => {
    expect(getGrade(110)).toBe(
      "Invalid input. Please enter a number between 0 and 100."
    );
  });

  test('returns "The student\'s grade is A." when mark is greater than 79', () => {
    expect(getGrade(80)).toBe("The student's grade is A.");
    expect(getGrade(90)).toBe("The student's grade is A.");
  });

  test('returns "The student\'s grade is B." when mark is between 60 and 79', () => {
    expect(getGrade(70)).toBe("The student's grade is B.");
    expect(getGrade(60)).toBe("The student's grade is B.");
  });

  test('returns "The student\'s grade is C." when mark is between 50 and 59', () => {
    expect(getGrade(55)).toBe("The student's grade is C.");
    expect(getGrade(50)).toBe("The student's grade is C.");
  });

  test('returns "The student\'s grade is D." when mark is between 40 and 49', () => {
    expect(getGrade(45)).toBe("The student's grade is D.");
    expect(getGrade(40)).toBe("The student's grade is D.");
  });

  test('returns "The student\'s grade is E." when mark is less than 40', () => {
    expect(getGrade(30)).toBe("The student's grade is E.");
    expect(getGrade(0)).toBe("The student's grade is E.");
  });
});
