import { SelectionModel } from "@angular/cdk/collections";
import { Component, ChangeDetectorRef } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatSelectionListChange } from "@angular/material/list";
import { FormBuilder } from "@angular/forms";
import { SharedService } from "../shared.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";
// import { MatDialog } from '@angular/material/dialog';
// import { DialogBoxComponent } from './dialog-box/dialog-box.component';
export interface PeriodicElement {
  name: string;
  id: number;
  taskDetails: string;
  taskName: string;
  taskCreatedDate: string;
  taskUpdatedDate: string;
  actions: string;
  edit: boolean;
}

@Component({
  selector: "app-to-do-list",
  templateUrl: "./to-do-list.component.html",
  styleUrls: ["./to-do-list.component.scss"],
})
export class ToDoListComponent {
  task: string;
  selectedHero?: any;
  // onFormSubmit:string;
  isSelected = true;
  checked: boolean;
  posts: any;
  showForm = false;
  taskName: string;
  description: string;
  disableTextbox = true;
  editButton = false;
  isEditing: boolean = false;
  enableEditIndex = null;
  editVisible = true;
  updateVisible = false;
  updateData: any;
  taskid: string;
  taskDesc: string;
  userName: string;
  taskDetails: string;

  completed: boolean;
  inputValue: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.showForm = false;
    this.retrieveTask();
  }

  displayedColumns: string[] = [
    "completed",
    "id",
    "taskName",
    "taskDetails",
    "taskCreatedDate",
    "taskUpdatedDate",
    "actions",
  ];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(false, []);

  onCheckBoxValueChange(selectedvalue) {
    console.log(selectedvalue, "selectedvalue");
    this.sharedService.UpdateTask(selectedvalue).subscribe((res) => {
      console.log(res.json().allTaskList);
      if (res.json().status == 200) {
        this.posts = res.json().allTaskList;
        // this.dataSource = new MatTableDataSource<PeriodicElement>(res.json().task);
      }
    });
  }
  isAllCheckBoxChecked() {
    return this.posts.every((p) => p.checked);
  }
  onDelete(event) {
    console.log(event, "event");
    this.sharedService.deletetask(event.id).subscribe((res) => {
      console.log(res.status);
      if (res.status == 200) {
        this.sharedService
          .retrievetask(localStorage.getItem("username"))
          .subscribe((res) => {
            console.log(res.status);
            this.dataSource = new MatTableDataSource<PeriodicElement>(
              res.json().allTaskList
            );
          });
      }
    });
  }

  onEdit(rowData) {
    console.log("rowData", rowData);

    this.disableTextbox = false;
    this.editButton = true;
    this.editVisible = false;
    this.updateVisible = true;
  }

  onUpdate(rowData) {
    console.log(rowData, "rowData");
    this.editVisible = true;
    this.updateVisible = false;
    this.disableTextbox = true;
    this.updateData = {
      id: rowData.id,
      name: localStorage.getItem("username"),
      taskName: this.taskid,
      taskDetails: this.taskDesc,
      completed: rowData.completed,
    };

    this.onCheckBoxValueChange(rowData);
    window.location.reload();

    this.cdr.detectChanges();
  }


  logout() {
    this.router.navigate(["/logout"]);
  }
  addTask() {
    this.inputValue = {
      name: localStorage.getItem("username"),
      taskName: this.taskName,
      taskDetails: this.description,
      completed: false,
    };
    this.sharedService.addtask(this.inputValue).subscribe((res) => {
      console.log(res.json().status);
      if (res.json().status == 200) {
        this.sharedService
          .retrievetask(localStorage.getItem("username"))
          .subscribe((res) => {
            this.dataSource = new MatTableDataSource<PeriodicElement>(
              res.json().allTaskList
            );
          });
        window.location.reload();
      }
    });
    console.log(this.taskName, "fdf", this.description);
  }

  retrieveTask() {
    this.sharedService
      .retrievetask(localStorage.getItem("username"))
      .subscribe((res) => {
        console.log(res.json().allTaskList);

        if (res.status == 200) {
          this.dataSource = new MatTableDataSource<PeriodicElement>(
            res.json().allTaskList
          );
        } else {
        }
      });
  }

}
