import { fireEvent, render, screen } from "@testing-library/react";
import Menu from "./Menu";

// Mock de la fonction scrollIntoView
const mockScrollIntoView = jest.fn();
window.HTMLElement.prototype.scrollIntoView = mockScrollIntoView;

describe("When Menu is created", () => {
  it("a list of mandatories links and the logo are displayed", async () => {
    render(<Menu />);
    await screen.findByText("Nos services");
    await screen.findByText("Nos réalisations");
    await screen.findByText("Notre équipe");
    await screen.findByText("Contact");
  });

  describe("and a click is triggered on contact button", () => {
    it("document location hash change and scroll to contact section", async () => {
      render(<Menu />);
      const contactButton = await screen.findByText("Contact");
      
      fireEvent(
        contactButton,
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      // Vérifie que le hash a été mis à jour
      expect(window.location.hash).toBe("#contact");
      
      // Vérifie que scrollIntoView a été appelé
      expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    });
  });
});
