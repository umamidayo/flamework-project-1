import { Service, OnStart } from "@flamework/core";
import { Players, ReplicatedStorage } from "@rbxts/services";

@Service()
export class PlayerInitializer implements OnStart {
    private GuiFolder = ReplicatedStorage.FindFirstChild("Gui") as Folder;
    private PlayerTag = this.GuiFolder.FindFirstChild("PlayerTag") as ScreenGui;

    onStart(): void {
        Players.PlayerAdded.Connect((player) => {
            this.clonePlayerTag(player);
        });
    }

    private clonePlayerTag(player: Player) {
        const Character = player.Character || player.CharacterAdded.Wait()[0];
        const Head = Character.FindFirstChild("Head") as Part;
        const newPlayerTag = this.PlayerTag.Clone();
        const Frame = newPlayerTag.FindFirstChild("Frame") as Frame;
        const NameLabel = Frame.FindFirstChild("NameLabel") as TextLabel;
        const LevelLabel = Frame.FindFirstChild("LevelLabel") as TextLabel;
        NameLabel.Text = player.Name;
        LevelLabel.Text = "Level 0";
        newPlayerTag.Parent = Head;
    }
}