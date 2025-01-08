import { createViewModel } from './players-view-model';

export function onNavigatingTo(args) {
    const page = args.object;
    page.bindingContext = createViewModel();
    console.log("players-page.js - onNavigatingTo - players:", page.bindingContext.get("players"));
}