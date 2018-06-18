import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormToolsService } from 'app/tools/components/forms/form-tools.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { MainContentComponent } from 'app/tools/components/shell/main-content/main-content.component';
import { MainNavResponsiveComponent } from 'app/tools/components/shell/main-nav-responsive/main-nav-responsive.component';
import { MainNavComponent } from 'app/tools/components/shell/main-nav/main-nav.component';
import { ShellComponent } from 'app/tools/components/shell/shell.component';
import { TopBarComponent } from 'app/tools/components/shell/top-bar/top-bar.component';
import { StatusPipe } from 'app/tools/status.pipe';
import { QuillModule } from 'ngx-quill';
import { CheckboxComponent } from './forms/checkbox/checkbox.component';
import { ControlErrorComponent } from './forms/control-error/control-error.component';
import { FormComponent } from './forms/form/form.component';
import { InputComponent } from './forms/input/input.component';
import { RadioComponent } from './forms/radio/radio.component';
import { SelectComponent } from './forms/select/select.component';
import { SwitchComponent } from './forms/switch/switch.component';
import { TextareaComponent } from './forms/textarea/textarea.component';
import { WysiwygComponent } from './forms/wysiwyg/wysiwyg.component';
import { ActionComponent } from './layouts/action/action.component';
import { EditorComponent } from './layouts/editor/editor.component';
import { LoadEmptyStateComponent } from './layouts/load-empty-state/load-empty-state.component';
import { ModalComponent } from './layouts/modal/modal.component';
import { ToastComponent } from './layouts/toast/toast.component';
import { DateComponent } from './table/date/date.component';
import { PillComponent } from './table/pill/pill.component';
import { TableComponent } from './table/table.component';
import { TextComponent } from './table/text/text.component';
import { CardComponent } from './widgets/card/card.component';
import { DashboardComponent } from './widgets/dashboard/dashboard.component';
import { FilterComponent } from './widgets/filter/filter.component';
import { PanelComponent } from './widgets/panel/panel.component';
import { TileCompactComponent } from './widgets/tile-compact/tile-compact.component';
import { TileEventComponent } from './widgets/tile-event/tile-event.component';
import { TileComponent } from './widgets/tile/tile.component';
import { TimelineComponent } from './widgets/timeline/timeline.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    QuillModule
  ],
  declarations: [
    ActionComponent,
    CardComponent,
    ControlErrorComponent,
    DashboardComponent,
    EditorComponent,
    FormComponent,
    InputComponent,
    LoadEmptyStateComponent,
    MainContentComponent,
    MainNavComponent,
    MainNavResponsiveComponent,
    ModalComponent,
    PanelComponent,
    RadioComponent,
    SelectComponent,
    ShellComponent,
    SwitchComponent,
    TableComponent,
    TextareaComponent,
    TileComponent,
    TimelineComponent,
    ToastComponent,
    TopBarComponent,
    WysiwygComponent,
    TileCompactComponent,
    TextComponent,
    PillComponent,
    DateComponent,
    FilterComponent,
    StatusPipe,
    CheckboxComponent,
    TileEventComponent
  ],
  exports: [
    ActionComponent,
    CardComponent,
    ControlErrorComponent,
    DashboardComponent,
    EditorComponent,
    FormComponent,
    InputComponent,
    LoadEmptyStateComponent,
    ModalComponent,
    PanelComponent,
    PillComponent,
    ReactiveFormsModule,
    ShellComponent,
    TableComponent,
    TileComponent,
    TileCompactComponent,
    TimelineComponent,
    ToastComponent,
    TileEventComponent
  ],
  providers: [FormToolsService, SchemaService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ComponentsModule { }
