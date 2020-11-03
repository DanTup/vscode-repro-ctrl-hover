import * as path from 'path';
import * as vs from 'vscode';

const textFiles: vs.DocumentSelector = { pattern: "**/*.txt" };

export function activate(context: vs.ExtensionContext) {
	const workspaceFolder = vs.workspace.workspaceFolders![0];
	const workspaceFolderPath = workspaceFolder.uri.fsPath;
	context.subscriptions.push(vs.languages.registerDefinitionProvider(
		textFiles,
		{
			async provideDefinition(document: vs.TextDocument, position: vs.Position, token: vs.CancellationToken): Promise<vs.DefinitionLink[] | undefined> {
				console.log(`Fetching definition for ${path.basename(document.uri.fsPath)} ${position.line}:${position.character}`);
				if (document.uri.fsPath.endsWith("one.txt")) {
					return [{
						originSelectionRange: new vs.Range(new vs.Position(0, 0), new vs.Position(0, 16)),
						targetUri: vs.Uri.file(path.join(workspaceFolderPath, "two.txt")),
						targetRange: new vs.Range(new vs.Position(0, 0), new vs.Position(0, 11)),
						targetSelectionRange: new vs.Range(new vs.Position(0, 0), new vs.Position(0, 11)),
					}];
				}
			}
		},
	));

	context.subscriptions.push(vs.workspace.onDidOpenTextDocument((e) => console.log(`Opened file ${path.basename(e.fileName)}`)));
	context.subscriptions.push(vs.workspace.onDidCloseTextDocument((e) => console.log(`Closed file ${path.basename(e.fileName)}`)));
}

export function deactivate() { }
