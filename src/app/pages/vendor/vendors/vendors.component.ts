import { Component, OnInit,ViewChild} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource, } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
export interface UserData {
  serial_no:string,
  name: string,    
  lastname: string,    
  // completedOrders:string,
  id: string,    
  restaurant:string,
  restaurant_delivery:string,
  restaurant_type:string,  
  contact:string,
  dob:string,
  message:string,
  email:string;
 status:string,
  action:string,
  address:string,
  doc:string,
  // totalOrders:string,
  // pendingOrders:string,
}
@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  closeResult: string;
  SearchValue:any = ''
  page:number = 0
  PageSize:number = 10
  count:number = 0
  displayedColumns: string[] = [ 'serial_no','name', 'lastname', 'restaurant', 'contact', 'email','address','message', 'doc','status','action'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  vendorList: any;
  VendorDocOne: any;
  VerndorDocTwo: any;
  timer: number;
  IsnotEmpty:any
  VendorId: any;
  constructor(private modalService: NgbModal, private service:CommonService,private router:Router,private fb:FormBuilder,private toaster:ToastrService) {
    this.dataSource = new MatTableDataSource(this.table);
  }
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {
    this.GetVendor()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 discountModal(discount) {
    this.modalService.open(discount, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
  }
  table = [
    {    
      serial_no:'1',
      name: 'Sandy', 
      lastname:'Doe',  
      id: "#sand334553",
      restaurant:'Big Bazar',  
      restaurant_delivery:"Yes",
      restaurant_type:"Italian",
      contact:"+91-33434343",
      dob:"12-02-1991",
      email:"sand@example.com",
      message:"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      doc:"View",
      // completedOrders:"50",
      // cancelledOrders:"0",
      // pendingOrders:"0",
      // totalOrders:"50",
      status:"",
      action:"1",      
    },
    {  
      serial_no:'2', 
      name: 'Rohan',  
      lastname:'Doe',  
      id: "#rohan334553", 
      restaurant:'Big Bazar',  
      restaurant_delivery:"Yes", 
      restaurant_type:"Indian",
      contact:"+91-33434343",
      dob:"12-02-1991",
      email:"sand@example.com",  
      message:"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",
      doc:"View",
      // completedOrders:"10",
      // cancelledOrders:"0",
      // pendingOrders:"30",
      // totalOrders:"40",
      status:"",
      action:"1",      
    },
    {    
      serial_no:'3',
      name: 'john',  
      lastname:'Root',  
      id: "#rohan334553",
      restaurant:'Big Bazar',
      restaurant_delivery:"Yes", 
      restaurant_type:"Chiness",
      contact:"+91-33434343",
      dob:"12-02-1991",
      email:"sand@example.com", 
      message:"It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      address:"#454 1st Block, Rammurthy, Bangalore-560016",   
      doc:"View",
      // completedOrders:"20",
      // cancelledOrders:"10",
      // pendingOrders:"10",
      // totalOrders:"30",
      status:"",
      action:"1",      
    },
   
  ]
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
// This is for the first modal
open1(content1) {
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
openWindowCustomClass(content3,doc) {
  this.VendorDocOne = doc[0].image?.media_file_url
  this.VerndorDocTwo = doc[1].image?.media_file_url
  this.modalService.open(content3, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
userprofileModal(userDelete) {
  this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
userDeleteModal(userDelete,id) {
  this.VendorId = id
  this.modalService.open(userDelete, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
}
edituserModal(edituser) {
  this.modalService.open(edituser, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
addUserModal(addUser) {
  this.modalService.open(addUser, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
vendorConfirmModal(vendorConfirm) {
  this.modalService.open(vendorConfirm, {backdropClass: 'light-blue-backdrop',centered: true,size: 'lg'});
}
vendorUnconfirmModal(vendorUnconfirm) {
  this.modalService.open(vendorUnconfirm, {backdropClass: 'light-blue-backdrop',centered: true,size: 'sm'});
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
GetVendor(){
  let obj = {
    "draw": 2,
    "is_approved":true,
    "columns": [
        {
            "data": "first_name",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        },
        {
            "data": "last_name",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        },
        {
            "data": "phone_number",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        },
        {
            "data": "email",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        },
        {
            "data": "id",
            "name": "",
            "searchable": true,
            "orderable": true,
            "search": {
                "value": "",
                "regex": false
            }
        }
    ],
    "order": [
        {
            "column": 3,
            "dir": "undefined"        }
    ],
    "start": this.page,
    "length": this.PageSize,
    "search": {
        "value": this.SearchValue,
        "regex": false
    }
}
  this.service.post(`vendor/vendor-list-pagination/`,obj).subscribe((res:any)=>{
    console.log('Vendor get',res);
    if([200,201].includes(res.code)){
     this.dataSource = new MatTableDataSource(res.data);
    this.count = res?.recordsTotal
    this.IsnotEmpty = res.data
}
  })
}
DeleteVendor(){
  this.service.delete(`vendor/delete-by-id/${this.VendorId}/`).subscribe((res:any)=>{
    if([200,201].includes(res.code)){
      this.GetVendor()
      this.modalService.dismissAll()
      this.toaster.success('Vendor deleted Successfully','Deleted')
    }
  })
}
onPaginateChange(event) {
  console.log("page",event);
  this.PageSize =  event.pageSize
    this.page = event.pageIndex ;
    this.GetVendor();
}

Filter(event: any) {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      let filterValue = (event.target as HTMLInputElement).value;
      this.SearchValue=filterValue;
     this.GetVendor();
    }, 1000)
  }
}
