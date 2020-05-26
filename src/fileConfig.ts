type FileConfig = {
	extension: string;
	content: string;
};

const tsxContent = `
import React from 'react';

import style from './{TM_FILENAME_BASE}.module.css';

type {TM_FILENAME_BASE}Props = {
}

const {TM_FILENAME_BASE} = (props: {TM_FILENAME_BASE}Props) => {
    return <div></div>;
};

export default {TM_FILENAME_BASE};
`;

const tsxTestContent = `
import React from "react";
import { render } from "@testing-library/react";
import {TM_FILENAME_BASE} from "./{TM_FILENAME_BASE}";

describe("valid descriptor", () => {
    it("does something", () => {});
    test("that something is done", () => {});
})
`;

const tsxStoriesContent = `
import React from 'react';
import {TM_FILENAME_BASE} from './{TM_FILENAME_BASE}';

export default {
    title: '{TM_FILENAME_BASE}',
    component: {TM_FILENAME_BASE},
    decorators: [],
};

// Name each version with an appropriate descriptor
export const NoPropVersion = () => <{TM_FILENAME_BASE} />;
// export const AlternativeVersion = () => <{TM_FILENAME_BASE} prop="Some Prop" />;
`;

const modulesCSSContent = "";

const CONFIG: FileConfig[] = [
	{ extension: ".tsx", content: tsxContent },
	{ extension: ".test.tsx", content: tsxTestContent },
	{ extension: ".stories.tsx", content: tsxStoriesContent },
	{ extension: ".module.css", content: modulesCSSContent },
];

export default CONFIG;
