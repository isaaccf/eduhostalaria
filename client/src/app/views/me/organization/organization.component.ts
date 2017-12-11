import { Component, OnInit, ViewChild } from '@angular/core';
import { MeService } from 'app/views/me/me.service';
import { SchemaService } from 'app/tools/components/schema.service';
import { BusService } from 'app/tools/bus.service';
import { IFormSchema, IWidgetSchema, IAction } from 'app/tools/schema.model';


@Component({
  selector: 'ab-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  @ViewChild('filesInput') filesInput;

  public tileSchema;
  public schemas;
  public user;
  public formSchema: IFormSchema;
  loadedMetadata = false;
  loadingPanelSchema = {
    loading: true,
    empty: false
  };
  public showModal = false;
  public organization: any;
  public fileConfirmButton: IAction = {
    label: 'Subir',
    key: 'upload',
    disabled: false
  }

  constructor(
    private bus: BusService,
    private me: MeService,
    private schema: SchemaService) {
  }

  ngOnInit() {
    this.schema
      .getSchema$('me_organization')
      .subscribe(schemas => {
        this.schemas = schemas;
        this.tileSchema = schemas['tile'];
        this.formSchema = schemas.form;
        this.bus
          .getUser$()
          .subscribe(user => {
            this.user = user;
            if (user && user.organizationId) {
              this.me
                .getAdministratedOrganization(user.organizationId)
                .subscribe((organization: any) => {
                  if (organization.banner) {
                    this.schemas.tile.actions[0].disabled = true;
                  }
                  this.schemas.header.title = organization.name;
                  this.organization = organization;
                  this.schema.populateDefaultValues(this.formSchema, this.organization);
                  this.loadedMetadata = true;
                });
            }
          });
      });
  }

  onSend(editedOrganization) {
    this.loadedMetadata = false;
    editedOrganization._id = this.organization._id;
    this.me
      .updateOrganization(editedOrganization)
      .subscribe(savedOrganization => {
        this.organization = savedOrganization;
        this.schema.populateDefaultValues(this.formSchema, this.organization);
        this.loadedMetadata = true;
      });
  }

  uploadFiles(org) {
    const filesData: FormData = this.getFilesToUpload();
    this.me.postOrganizationBanner(org._id, filesData).subscribe(d => {
      this.me.getAdministratedOrganization(this.user.organizationId).subscribe((organization: any) => {
        this.schemas.tile.actions[0].disabled = true;
        this.organization = organization;
        this.showModal = false;
      });
    });
  }

  onDeleteFile(file) {
    this.me.removeOrganizationBanner(this.organization._id, file.name).subscribe(organization => {
      const newFileConfirmButton = Object.assign({}, this.fileConfirmButton);
      this.schemas.tile.actions[0].disabled = false;
      this.fileConfirmButton = newFileConfirmButton;
      this.organization = organization;
    });
  }

  getFilesToUpload() {
    let filesToUpload: Array<File> = [];
    const domFiles = this.filesInput.nativeElement.files;
    const formData: FormData = new FormData();

    filesToUpload = <Array<File>>domFiles;

    for (let i = 0; i < domFiles.length; i++) {
      formData.set('files', filesToUpload[i], filesToUpload[i]['name']);
    }

    return formData;
  }
}
