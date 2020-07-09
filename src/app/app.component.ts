import { Component, OnInit, ViewChild } from '@angular/core';
import { IToDo } from './interfaces/itodo';
import { MatTableDataSource } from '@angular/material/table';
import { PlaceholderService } from './services/placeholder.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Placeholder';

  dataSource: MatTableDataSource<IToDo>;
  displayedColumns: string[] = [ 'id', 'userId', 'title', 'completed' ];
  count: number;
  loading = true;

  constructor( private placeHolderService: PlaceholderService) {}

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async ngOnInit(): Promise<void> {
    this.placeHolderService.getAll().then((data: IToDo[]) => {
      this.count = data.length;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

}
