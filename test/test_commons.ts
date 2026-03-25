import { screen, fireEvent } from "@testing-library/react-native";

export const TestCommons = {
  confirmTextShown: (text: string) => {
    expect(screen.getByText(text)).toBeTruthy();
  },

  confirmTextNotShown: (text: string) => {
    expect(screen.queryByText(text)).toBeNull();
  },

  confirmWidgetShown: (testID: string) => {
    expect(screen.getByTestId(testID)).toBeTruthy();
  },

  confirmLoadingShown: () => {
    expect(screen.getByTestId("loading-indicator")).toBeTruthy();
  },

  pressButton: (text: string) => {
    fireEvent.press(screen.getByText(text));
  },

  pressButtonByTestID: (testID: string) => {
    fireEvent.press(screen.getByTestId(testID));
  },

  input: (placeholder: string, text: string) => {
    fireEvent.changeText(screen.getByPlaceholderText(placeholder), text);
  },
};
