import * as vscode from "vscode";
import { dirname, join, normalize } from "path";

export const sanitiseDirectory = (inputPath: string) => {
	let directory = inputPath === "." || inputPath === "/" ? "./" : inputPath;
	directory = trimSpecialChars(directory);
	directory = expandPath(directory);
	directory = expandVscodeVariables(directory);
	return directory;
};

export const trimSpecialChars = (inputPath: string) => {
	console.log("inputPath: ", inputPath);
	// remove special characters from the selected path
	const specialChars = [
		"'",
		'"',
		"(",
		")",
		"[",
		"]",
		"*",
		"+",
		"!",
		"@",
		"#",
		"%",
		"^",
		"&",
		"=",
		"<",
		">",
		"?",
		"`",
		":",
		";",
		"?",
	];
	specialChars.forEach((char) => (inputPath = inputPath.replace(char, "")));
	console.log("inputPath: ", inputPath);
	// remove spaces from the begining and end of the path
	inputPath = inputPath.trim();
	console.log("inputPath: ", inputPath);
	return inputPath;
};

export const expandVscodeVariables = (text: string) => {
	// ${workspaceRoot}
	text.replace("${workspaceRoot}", "");
	return text;
};

export const expandPath = (inputPath: string) => {
	let finalPath: string;

	// check for active text editor
	const activeTextEditor = vscode.window.activeTextEditor;
	if (!activeTextEditor) {
		vscode.window.showWarningMessage("No file open.");
		return inputPath;
	}

	// get final path
	if (inputPath.startsWith("./") || inputPath.startsWith("../")) {
		// if the selected path starts with . or ..; it as relative path
		const currentFilePath: string = dirname(activeTextEditor.document.uri.fsPath);
		if (currentFilePath === ".") {
			vscode.window.showWarningMessage("File not saved. Can't create relative path.");
			return inputPath;
		}
		finalPath = normalize(join(currentFilePath, inputPath));
	} else if (inputPath.startsWith("~/")) {
		// if the selected path start with ~; resolve it cross platform way
		inputPath = inputPath.replace("~/", "");
		let homedir = process.env[process.platform === "win32" ? "USERPROFILE" : "HOME"] || "";
		finalPath = normalize(join(homedir, inputPath));
	} else {
		// else assume that the selected string is a full path;
		finalPath = normalize(inputPath);
	}
	return finalPath;
};
