import { Store } from "@ngxs/store";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Schedules } from "src/app/models";
import { StoreSchedule } from "src/app/state/schedule/schedule.state";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
})
export class ScheduleComponent implements OnInit {
  schedules: Schedules[] = [];
  filteredSchedules: Schedules[] = [];
  searchText: string = "";
  searchTimeout: any;
  currentPage = 1;
  schedulesPerPage = 4;
  totalSchedules: number = 0;
  sortColumn: string = "";
  sortDirection: string = "";

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchText = params["searchText"] || "";
      this.currentPage = +params["page"] || 1;
      this.schedulesPerPage = +params["limit"] || 4;
      this.sortColumn = params["_sort"] || "";
      this.sortDirection = params["_order"] || "";
      this.fetchSchedules();
      this.getTotalSchedules();
    });
  }

  storeScheduleData(schedule: Schedules) {
    this.store.dispatch(new StoreSchedule(schedule));
    this.router.navigate([`/schedules/${schedule.id}`]);
  }

  onEditSchedule(schedule: Schedules) {
    this.store.dispatch(new StoreSchedule(schedule));
    this.router.navigate(["/edit"]);
  }

  getTotalSchedules() {
    this.http.get<Schedules[]>("http://localhost:3000/schedules").subscribe((data) => {
      this.totalSchedules = data.length;
    });
  }

  fetchSchedules() {
    const params = {
      _page: this.currentPage,
      _limit: this.schedulesPerPage,
      patientName_like: this.searchText,
      _sort: this.sortColumn,
      _order: this.sortDirection,
    };

    this.http.get<Schedules[]>("http://localhost:3000/schedules", { params }).subscribe((data) => {
      this.schedules = data;
      this.filteredSchedules = data;
    });
  }

  searchUsers() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.fetchSchedules();
      this.updateQueryParams();
    }, 300);
  }

  clearSearch() {
    this.searchText = "";
    this.searchUsers();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.schedulesPerPage = event.pageSize;
    this.fetchSchedules();
    this.updateQueryParams();
  }

  updateQueryParams() {
    const queryParams: Params = {
      ["searchText"]: this.searchText,
      ["page"]: this.currentPage,
      ["limit"]: this.schedulesPerPage,
      ["_sort"]: this.sortColumn,
      ["_order"]: this.sortDirection,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: "merge",
    });
  }

  onColumnHeaderClick(columnName: string) {
    if (this.sortColumn === columnName) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = columnName;
      this.sortDirection = "asc";
    }

    this.fetchSchedules();
  }

  // openSpecialtiesModal(specialties: string[]) {
  //   this.dialog.open(SpecialtiesModalComponent, {
  //     data: { specialties: specialties },
  //   });
  // }

  // getFormattedSpecialties(specialties: string[]): string {
  //   return specialties.slice(0, 5).join(', ');
  // }
}
