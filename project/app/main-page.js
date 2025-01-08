import { createViewModel } from './main-view-model';

export function onNavigatingTo(args) {
    console.log("Ana sayfa yüklendi, onNavigatingTo çağrıldı.");
    const page = args.object;
    page.bindingContext = createViewModel();
    console.log("Binding context ayarlandı, viewModel:", page.bindingContext);
}