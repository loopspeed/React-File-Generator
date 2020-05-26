import * as vscode from "vscode";
import { mkdir, appendFile, existsSync } from "fs";
import { sanitiseDirectory, trimSpecialChars, expandVscodeVariables, expandPath } from "./util";

import CONFIG from "./fileConfig";
import { createRequireFromPath } from "module";

const createFromPath = (path: string) => {
	vscode.window
		.showInputBox({
			value: path,
			ignoreFocusOut: true,
			prompt: "Create at the above path?",
			valueSelection: [-1, -1],
		})
		.then((path) => {
			if (!path) {
				vscode.window.showErrorMessage("Couldn't create files");
				return;
			}

			// Split directory from file name
			let splitPath = path?.split("/");
			const fileName = splitPath[splitPath.length - 1];

			// Remove file name and rejoin directory
			splitPath.pop();
			let directory = splitPath.join("/");
			directory = sanitiseDirectory(directory);

			if (directory !== "./") {
				mkdir(directory, { recursive: true }, (err) => {
					if (err) {
						vscode.window.showErrorMessage("Couldn't create directory");
						return;
					}
					createFileInDirectory(fileName, directory);
					return;
				});
			} else {
				createFileInDirectory(fileName, directory);
			}
		});
};

const createFromScratch = () => {
	vscode.window
		.showInputBox({
			value: "",
			ignoreFocusOut: true,
			prompt: "Please enter the relative directory to create the files",
			valueSelection: [-1, -1],
		})
		.then((dir) => {
			let directory = dir || "./";
			directory = sanitiseDirectory(directory);

			if (directory !== "./") {
				mkdir(directory, { recursive: true }, (err) => {
					if (err) {
						vscode.window.showErrorMessage("Couldn't create directory");
						return;
					}
					promptFileNameInDirectory(directory);
					return;
				});
			} else {
				promptFileNameInDirectory(directory);
			}
		});
};

const createFileInDirectory = (fileName: string, directory: string) => {
	CONFIG.forEach((fc) => {
		let fn = fileName.charAt(0) === "/" ? fileName.substring(1) : fileName;
		let path = directory + "/" + fn + fc.extension;
		if (existsSync(path)) {
			vscode.window.showWarningMessage("Path already exists.");
			return;
		}

		appendFile(path, fc.content.replace(/{TM_FILENAME_BASE}/g, fn), (err) => {
			if (err) {
				vscode.window.showErrorMessage("Couldn't create the document!");
				return;
			}

			vscode.workspace.openTextDocument(path).then((textDocument) => {
				if (textDocument) {
					vscode.window.showTextDocument(textDocument);
				} else {
					vscode.window.showErrorMessage("Couldn't open the document!");
				}
			});
		});
	});
};

const promptFileNameInDirectory = (directory: string) => {
	vscode.window
		.showInputBox({
			value: "",
			ignoreFocusOut: true,
			prompt: "Please enter the file name",
			valueSelection: [-1, -1],
		})
		.then((fileName) => {
			if (fileName) {
				createFileInDirectory(fileName, directory);
			}
		});
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand("react-file-generator.generate", () => {
		// check for active text editor
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage("No file open.");
			return;
		}

		// check if path has been selected
		var selectedPath = editor.document.getText(editor.selection);
		selectedPath = trimSpecialChars(selectedPath);
		selectedPath = expandPath(selectedPath);
		selectedPath = expandVscodeVariables(selectedPath);

		if (selectedPath && selectedPath !== ".") {
			createFromPath(selectedPath);
		} else {
			createFromScratch();
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
