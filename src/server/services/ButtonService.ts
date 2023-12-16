import { Service, OnStart } from "@flamework/core";
import { CollectionService, Players, ReplicatedStorage } from "@rbxts/services";

@Service()
export class ButtonService implements OnStart {
    private GuiFolder = ReplicatedStorage.FindFirstChild("Gui") as Folder;
    private ButtonGui = this.GuiFolder.FindFirstChild("ButtonGui") as BillboardGui;
    private debounce: { [playerName: string]: number } = {};

    onStart(): void {
        const buttons = CollectionService.GetTagged("Button") as BasePart[];
        buttons.forEach((button) => {
            const buttonGui = this.ButtonGui.Clone();
            const buttonFrame = buttonGui.FindFirstChild("Frame") as Frame;
            const counter = buttonFrame.FindFirstChild("Counter") as TextLabel;
            let presses = 0;
            counter.Text = "Presses: " + tostring(presses);
            buttonGui.Parent = button;
            button.Touched.Connect((hit: BasePart) => {
                if (!hit.Parent?.FindFirstChild("Humanoid")) return;
                const Player = Players.GetPlayerFromCharacter(hit.Parent);
                if (!Player) return;
                if (this.debounce[Player.Name] && tick() - this.debounce[Player.Name] < 0.3) return;
                this.debounce[Player.Name] = tick();
                presses++;
                counter.Text = "Presses: " + tostring(presses);
            })
        });
    }
}