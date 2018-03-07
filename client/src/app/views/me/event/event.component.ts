import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SchemaService } from 'app/tools/components/schema.service';
import { MeService } from 'app/views/me/me.service';
import { SecurityService } from 'app/tools/security.service';
import { BusService } from 'app/tools/bus.service';
import { IFormSchema, IWidgetSchema, IAction } from 'app/tools/schema.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Level } from 'app/tools/message.model';
import ImageCompressor from 'image-compressor.js';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'ab-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @ViewChild('thumbnailInput') thumbnailInput: ElementRef;
  @ViewChild('filesInput') filesInput: ElementRef;
  @ViewChild('filesSectionRef') filesSectionRef: ElementRef;

  public formKey: 'create' | 'edit' = 'create';
  public panelSchema: IWidgetSchema;
  public filesSchema: IWidgetSchema;
  public editActionsSchema: IWidgetSchema;
  public thumbnailSchema: IWidgetSchema;
  public formSchema: IFormSchema;
  public showFilesModal = false;
  public showThumbnailModal = false;
  public fileConfirmButton = {
    label: 'Subir',
    key: 'upload'
  };
  public organization: any;
  public event: any;
  public isDeletingMode;
  public deleteForm: FormGroup;

  constructor(
    private schema: SchemaService,
    private route: ActivatedRoute,
    private me: MeService,
    private security: SecurityService,
    private bus: BusService,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.createDeleteForm();
    this.organization = this.security.getLocalOrganization();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.formKey = 'edit';
        this.me.getEventById(params['id']).subscribe((ev: any) => {
          this.event = ev;
          if (ev.thumbnail) {
            const url = `data:${ev.thumbnail.type};base64, ${ev.thumbnail.content}`;

            ev.thumbnail.url = this.sanitizer.bypassSecurityTrustUrl(url);
          }
          this.getSchemas();
        });
      } else {
        this.getSchemas();
      }
    });
  }

  getSchemas() {
    this.schema
      .getSchema$('me_event')
      .subscribe(schemas => {
        this.panelSchema = schemas;
        this.filesSchema = schemas['tile-files'];
        this.thumbnailSchema = schemas['tile-thumbnail'];
        if (this.event) {
          this.editActionsSchema = this.calcButtons(schemas.editActions);
        }
        this.formSchema = schemas[this.formKey];
        if (this.event) {
          this.panelSchema.header.title = 'Información da oferta';
          this.schema.populateDefaultValues(this.formSchema, this.event);
          this.formSchema.controls[0].defaultValue = new Date(this.event.date).toISOString().slice(0, 10);
        } else {
          this.schema.populateDefaultValues(this.formSchema, this.organization);
          this.formSchema.controls[0].defaultValue = 'dd/mm/aaaa';
          this.formSchema.controls[4].defaultValue = 'hh:mm';
          this.formSchema.controls[5].defaultValue = 'hh:mm';
        }
      });
  }

  calcButtons(editActions: IAction[]): any {
    editActions.map(action => {
      if (this.event.status === 'CANCELED') {
        action.disabled = true;
      } else {
        if (this.event.status === action.disabledStatus) {
          action.disabled = true;
        } else {
        }
      }
    });
    return editActions;
  }

  createDeleteForm() {
    this.deleteForm = this.fb.group({
      sendMessage: [false, Validators.required],
      sendCustomMessage: [false, Validators.required],
      customMessage: ['']
    });
  }

  onSend(ev) {
    const data = Object.assign({}, ev);

    this.transformDate(data);
    if (this.formKey === 'create') {
      this.me.postEvent(data).subscribe((event: any) => {
        this.bus.emit({ level: Level.SUCCESS, text: 'Oferta creada con éxito', code: '' });
        this.event = event;
        this.formKey = 'edit';
        this.ngOnInit();
      });
    }
    if (this.formKey === 'edit') {
      this.updateEvent(data);
      this.me.editEvent(this.event).subscribe(d => {
        data.ownerId = this.event.ownerId;
        this.ngOnInit();
        this.bus.emit({ level: Level.SUCCESS, text: 'Oferta editada con éxito', code: '' });
      });
    }
  }

  updateEvent(data) {
    Object.keys(data).map(key => {
      this.event[key] = data[key];
    });
  }

  uploadThumbnail(event) {
    const thumbnail: File = this.thumbnailInput.nativeElement.files[0];
    const reader: FileReader = new FileReader();

    if (!thumbnail) {
      return this.showThumbnailModal = false;
    }

    // tslint:disable-next-line:no-unused-expression
    new ImageCompressor(thumbnail,
      {
        quality: 0.6,
        success: (compressedFile: File) => {
          reader.onload = (ev: any) => {
            this.me.uploadThumbnail(event._id, btoa(ev.target.result), compressedFile.type)
              .subscribe((updatedEvent: any) => {
                this.thumbnailInput.nativeElement.value = '';
                this.showThumbnailModal = false;
                this.event = updatedEvent;
                this.ngOnInit();
              });
          }
          reader.readAsBinaryString(compressedFile);
        }
      });

  }

  onShowThumbnailModal() {
    if (this.event.status !== 'CANCELED') {
      this.showThumbnailModal = true;
    }
  }

  uploadFiles(ev) {
    const filesData: FormData = this.getFilesToUpload();

    this.me.postEventFiles(ev._id, filesData).subscribe(d => {
      this.filesInput.nativeElement.value = '';
      if (this.formKey === 'edit') {
        this.me.getEventById(this.event._id).subscribe(event => {
          this.event = event;
          this.showFilesModal = false;
        });
      }
    });
  }

  onDeleteFile(file) {
    this.me.removeEventFile(this.event._id, file.name).subscribe(event => {
      this.event = event;
    });
  }

  getFilesToUpload() {
    let filesToUpload: Array<File> = [];
    const domFiles = this.filesInput.nativeElement.files;
    const formData: FormData = new FormData();

    filesToUpload = <Array<File>>domFiles;

    for (let i = 0; i < domFiles.length; i++) {
      formData.append('files', filesToUpload[i], filesToUpload[i]['name']);
    }

    return formData;
  }

  transformDate(event) {
    const dateArr = event.date.split('-');
    const year = dateArr[0];
    const month = dateArr[1] - 1;
    const day = dateArr[2];
    let hour = 12;
    event.date = new Date(year, month, day, hour, 0, 0, 0);
    if (event.shift === 'Diurno') {
      hour = 14;
    } else {
      hour = 21;
    }
    event['time'] = new Date(year, month, day, hour, 0, 0, 0);
  }

  onCloseDeleteModal() {
    this.isDeletingMode = false;
  }

  onEditAction(key) {
    switch (key) {
      case 'activate':
        this.me.changeEventStatus(this.event, 'ACTIVE').subscribe(() => {
          this.ngOnInit();
        });
        break;
      case 'delete':
        this.isDeletingMode = true;
        break;
      case 'deactivate':
        this.me.changeEventStatus(this.event, 'DISABLED').subscribe(() => {
          this.ngOnInit();
        });
        break;
    }
  }

  onReturnFromDeletingMode() {
    this.isDeletingMode = false;
  }

  onSubmitDeleteForm() {
    const sendMessage = this.deleteForm.get('sendMessage').value;
    const sendCustomMessage = this.deleteForm.get('sendCustomMessage').value;
    const customMessage = this.deleteForm.get('customMessage').value;

    if (!sendCustomMessage) {
      this.me.deleteEvent(this.event, sendMessage, undefined).subscribe(() => {
        this.ngOnInit();
      });
    }

    if (sendCustomMessage && customMessage) {
      this.me.deleteEvent(this.event, sendMessage, customMessage).subscribe(() => {
        this.ngOnInit();
      });
    }

    this.isDeletingMode = false;
  }

  onScrollToFiles(el: ElementRef) {
    this.filesSectionRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

}
