//#region (imports)
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CctvApprovalPopupComponent } from '../../../shared/components/cctv-approval-popup/cctv-approval-popup.component';
import { BaseService } from 'src/app/service/base.service';
import { mergeMap } from 'rxjs';
import { TableColumn } from 'src/app/interfaces/interfaces';
import { Tabs } from 'src/app/shared';
import { HttpErrorResponse } from '@angular/common/http';

interface Course {
  value: string;
  viewValue: string;
}

//#endregion

@Component({
  selector: 'app-cctv-management-admin',
  templateUrl: './cctv-management-admin.component.html',
  styleUrls: ['./cctv-management-admin.component.scss']
})
export class CctvManagementAdminComponent {

  //#region (global variables)
  examCycleList: { 
    id: number; 
    examCycleName: string; 
    courseId: string; 
    status: string; 
  }[] = [
    {
      examCycleName: 'Exam Cycle 1',
      id: 1,
      courseId: '',
      status: '',
    },{
      examCycleName: 'Exam Cycle 2',
      id: 2,
      courseId: '',
      status: '',
    },{
      examCycleName: 'Exam Cycle 3',
      id: 3,
      courseId: '',
      status: '',
    },
  ]
  examCycleControl = new FormControl(''); 

  tabs: any[] = [];
  isDataLoading: boolean = true;
  currentTabIndex = 0;
  instituteesTableColumns: TableColumn[] = [];
  instituteesTableData = []
  pageSize = 10;

  // instituteesCCTVpendingTableHeaders = [
  //   {
  //     header: 'Institute name',
  //     columnDef: 'instituteName',
  //     isSortable: true,
  //     cell: (element: Record<string, any>) => `${element['instituteName']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a',
  //       'color': '#00000099'
  //     },
  //   },{
  //     header: 'Institute Code',
  //     columnDef: 'instituteCode',
  //     cell: (element: Record<string, any>) => `${element['instituteCode']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: 'District name',
  //     columnDef: 'district',
  //     cell: (element: Record<string, any>) => `${element['districtName']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '165px', 'color': '#00000099'
  //     },
  //   },{
  //     header: '',
  //     columnDef: 'status',
  //     cell: (element: Record<string, any>) => `${element['status']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   }, {
  //   //   header: '',
  //   //   columnDef: 'updateStatus',
  //   //   isLink: true
  //   //   cell: (element: Record<string, any>) => `${element['updateStatus']} === true? 'Approve/Reject'`
  //   }
  // ]
  // instituteesCCTVpendingTableData = [
  // ];

  // instituteesCCTVverifiedTableHeaders = [
  //   {
  //     header: 'Institute name',
  //     columnDef: 'instituteName',
  //     isSortable: true,
  //     cell: (element: Record<string, any>) => `${element['instituteName']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a',
  //       'color': '#00000099'
  //     },
  //   },{
  //     header: 'Institute Code',
  //     columnDef: 'instituteCode',
  //     cell: (element: Record<string, any>) => `${element['instituteCode']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: 'District name',
  //     columnDef: 'districtName',
  //     cell: (element: Record<string, any>) => `${element['districtName']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: 'IP address',
  //     columnDef: 'IPaddress',
  //     cell: (element: Record<string, any>) => `${element['IPaddress']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: '',
  //     columnDef: 'status',
  //     cell: (element: Record<string, any>) => `${element['status']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
  //     },
  //   }
  // ]
  // instituteesCCTVverifiedTableData = [
  // ];

  // instituteesCCTVrejectedTableHeaders = [
  //   {
  //     header: 'Institute name',
  //     columnDef: 'instituteName',
  //     isSortable: true,
  //     cell: (element: Record<string, any>) => `${element['instituteName']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a',
  //       'color': '#00000099'
  //     },
  //   },{
  //     header: 'Institute Code',
  //     columnDef: 'instituteCode',
  //     cell: (element: Record<string, any>) => `${element['instituteCode']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: 'District name',
  //     columnDef: 'districtName',
  //     cell: (element: Record<string, any>) => `${element['districtName']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: 'IP address',
  //     columnDef: 'IPaddress',
  //     cell: (element: Record<string, any>) => `${element['IPaddress']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
  //     },
  //   },{
  //     header: '',
  //     columnDef: 'status',
  //     cell: (element: Record<string, any>) => `${element['status']}`,
  //     cellStyle: {
  //       'background-color': '#0000000a', 'width': '215px', 'color': '#00000099'
  //     },
  //   }
  // ]
  // instituteesCCTVrejectedTableData = [
  // ];

  searcControl = '';
  //#endregion

  breadcrumbItems = [
    { label: 'CCTV Management', url: '' },
  ]
  constructor(
    private baseService: BaseService,
    private router: Router,
    private dialog: MatDialog,
  ){
  }

  ngOnInit() {
    this.intialisation();
  }

  //#region (intialisation)
  intialisation() {
    this.initializeTabs()
    this.initializeTableColumns()
    this.getExamCycles()
    this.getInstitutesCCTVtableData()
  }

  initializeTabs() {
    this.tabs = Tabs['CCTV_Management'];
  }

  initializeTableColumns() {
    this.instituteesTableColumns = []
    const TableColumns = [
      {
        header: 'Institute name',
        columnDef: 'instituteName',
        isSortable: true,
        cell: (element: Record<string, any>) => `${element['instituteName']}`,
        cellStyle: {
          'background-color': '#0000000a',
          'color': '#00000099'
        },
      },{
        header: 'Institute Code',
        columnDef: 'instituteCode',
        cell: (element: Record<string, any>) => `${element['instituteCode']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
        },
      },{
        header: 'District name',
        columnDef: 'district',
        cell: (element: Record<string, any>) => `${element['district']}`,
        cellStyle: {
          'background-color': '#0000000a', 'width': '165px', 'color': '#00000099'
        },
      },
    ]

    switch(this.currentTabIndex) {
      case 0: {
        TableColumns.push(
          {
            header: '',
            columnDef: 'status',
            cell: (element: Record<string, any>) => `${element['status']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
            },
          })
        break;
      }
      case 1: {
        TableColumns.push(
          {
            header: 'IP address',
            columnDef: 'ipAddress',
            cell: (element: Record<string, any>) => `${element['ipAddress']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
            },
          }
        );
        TableColumns.push(
          {
            header: 'status',
            columnDef: 'status',
            cell: (element: Record<string, any>) => `${element['status']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '100px', 'color': '#00000099'
            },
          }
        )
        break;
      }
      case 2: {
        TableColumns.push(
          {
            header: 'IP address',
            columnDef: 'ipAddress',
            cell: (element: Record<string, any>) => `${element['ipAddress']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '200px', 'color': '#00000099'
            },
          }
        );
        TableColumns.push(
          {
            header: '',
            columnDef: 'status',
            cell: (element: Record<string, any>) => `${element['status']}`,
            cellStyle: {
              'background-color': '#0000000a', 'width': '215px', 'color': '#00000099'
            },
          }
        );
        break;
      }
    }
    this.instituteesTableColumns = TableColumns
  }

  //#region (exam cycles)
  getExamCycles() {
    this.baseService.getExamCycleList()
    .pipe(mergeMap((res: any) => {
      return this.formatExamCycles(res)
    }))
    .subscribe({
      next: (res: any) => {
        this.examCycleList = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.isDataLoading = false;
      }
    })
  }

  formatExamCycles(response: any) {
    const examCycles: { 
      id: number; 
      examCycleName: string; 
      courseId: string; 
      status: string; 
    }[] = []
    if (response && response.length > 0) {
      response.forEach((examCycle: any) => {
        const exam = {
          id: examCycle.id,
          examCycleName: examCycle.examCycleName,
          courseId: examCycle.courseId,
          status: examCycle.status,
        }

        examCycles.push(exam)
      })
    }
    return examCycles
  }
  //#endregion

  getInstitutesCCTVtableData(searchKey: string = '') {
    this.baseService.getAllInstitutesList$()
    // .pipe(mergeMap((response: any) => {
    //   return this.getformatInstitutesTablesData(response)
    // }))
    // .subscribe((InstituteesCCTVtableData: any) => {
    //   this.getTablesData(InstituteesCCTVtableData)
    // })
    const response = this.baseService.getAllInstitutesList$()
    const InstituteesCCTVtableData = this.getformatInstitutesTablesData(response.result.response)
    this.getTablesData(InstituteesCCTVtableData)
  }

  getformatInstitutesTablesData(instituteesList: any) {
    const formattedInstitutesList: {
      instituteId: number,
          instituteName: string,
          instituteCode: string,
          district: string,
          allowedForExamCentre: boolean,
          cctvVerified: boolean,
          ipAddress: string,
    }[] = [];
    if (instituteesList && instituteesList.length) {
      instituteesList.forEach((institute: any) => {
        institute = institute.institute
        const formattedInstitute = {
          instituteId: institute.instituteId,
          instituteName: institute.instituteName,
          instituteCode: institute.instituteCode,
          district: institute.district,
          allowedForExamCentre: institute.allowedForExamCentre,
          cctvVerified: institute.cctvVerified,
          ipAddress: institute.ipAddress,
        }
        formattedInstitutesList.push(formattedInstitute)
      })
    }
    return formattedInstitutesList
  }

  getTablesData(InstituteesCCTVtableData: any) {
    // InstituteesCCTVtableData.filter((institute: any) => {})
    switch(this.currentTabIndex) {
      case 0 : {
        this.instituteesTableData = InstituteesCCTVtableData.filter((institute: any) => {
          if (institute.cctvVerified === false) {
            institute.updateStatus == true;
            const pendingInstitute = institute;
            pendingInstitute['status'] = 'Approve / Reject',
            pendingInstitute['hasStyle'] = true,
            pendingInstitute['cellStyle'] = {
                status: {
                'color': '#0074B6',
                'cursor': 'pointer',
              },
            }
            return pendingInstitute;
          }
        })
        break;
      }
      case 1 : {
        this.instituteesTableData = InstituteesCCTVtableData.filter((institute: any) => {
          if (institute.cctvVerified && institute.allowedForExamCentre ) {
            const approvedInstitute = institute;
            approvedInstitute['status'] = 'Reject',
            approvedInstitute['hasStyle'] = true,
            approvedInstitute['cellStyle'] = {
                status: {
                'color': '#0074B6',
                'cursor': 'pointer',
              },
            }
            return approvedInstitute;
          }
        })
        break;
      }
      case 2 : {
        this.instituteesTableData = InstituteesCCTVtableData.filter((institute: any) => {
          if (institute.cctvVerified === true && institute.allowedForExamCentre === false) {
            const approvedInstitute = institute;
            approvedInstitute['status'] = 'Enter alternate Institute',
            approvedInstitute['hasStyle'] = true,
            approvedInstitute['cellStyle'] = {
                status: {
                'color': '#0074B6',
                'cursor': 'pointer',
              },
            }
            return approvedInstitute;
          }
        })
        break;
      }
    }
    setTimeout(() => {
      this.isDataLoading = false;
    }, 0)
    // this.instituteesCCTVpendingTableData = InstituteesCCTVtableData.filter((institute: any) => {
    //   if (institute.cctvVerified === false) {
    //     institute.updateStatus == true;
    //     const pendingInstitute = institute;
    //     pendingInstitute['status'] = 'Approve / Reject',
    //     pendingInstitute['hasStyle'] = true,
    //     pendingInstitute['cellStyle'] = {
    //         status: {
    //         'color': '#0074B6',
    //         'cursor': 'pointer',
    //       },
    //     }
    //     return pendingInstitute;
    //   }
    // })
    // this.instituteesCCTVverifiedTableData = InstituteesCCTVtableData.filter((institute: any) => {
    //   if (institute.cctvVerified === true && institute.allowedForExamCentre === true) {
    //     const approvedInstitute = institute;
    //     approvedInstitute['status'] = 'Reject',
    //     approvedInstitute['hasStyle'] = true,
    //     approvedInstitute['cellStyle'] = {
    //         status: {
    //         'color': '#0074B6',
    //         'cursor': 'pointer',
    //       },
    //     }
    //     return approvedInstitute;
    //   }
    // })
    // this.instituteesCCTVrejectedTableData = InstituteesCCTVtableData.filter((institute: any) => {
    //   if (institute.cctvVerified === true && institute.allowedForExamCentre === false) {
    //     const approvedInstitute = institute;
    //     approvedInstitute['status'] = 'Enter alternate Institute',
    //     approvedInstitute['hasStyle'] = true,
    //     approvedInstitute['cellStyle'] = {
    //         status: {
    //         'color': '#0074B6',
    //         'cursor': 'pointer',
    //       },
    //     }
    //     return approvedInstitute;
    //   }
    // })
  }

  //#endregion

  tabChange(event: any) {
    this.isDataLoading = true
    this.currentTabIndex = event.index;
    this.initializeTableColumns()
    switch(event.index) {
      case 0: {
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        break;
      }
    }
    this.getInstitutesCCTVtableData()
  }
  //#region (approve or reject cctv status)

  updateInstituteCCTVStatus(event: any) {
    switch(this.currentTabIndex) {
      case 0: {
        this.ApproveOrRejectInstituteCCTV(event)
        break;
      }
      case 1: {
        this.RejectInstituteCCTV(event)
        break;
      }
      case 2: {
        this.assignAlternateInstitute(event)
        break;
      }
    }
  }
  ApproveOrRejectInstituteCCTV(event: any) {
    const dialogData = {
      controls: [
        {
          controlLable: 'Enter IP address',
          controlName: 'IPaddress',
          controlType: 'input',
          placeholder: 'Type here',
          value: event.ipAddress,
          validators: ['required'],
          disabled: true,
        },{
          controlLable: 'Enter remarks',
          controlName: 'remarks',
          controlType: 'textArea',
          placeholder: 'Type here',
          value: '',
          validators: []
        },
      ],
      buttons: [
        {
          btnText: 'Cancel',
          positionClass: 'left',
          btnClass: 'btn-outline-gray',
          type: 'close'
        },
        {
          btnText: 'Approve',
          positionClass: 'right',
          btnClass: 'btn-full',
          type: 'Approved'
        },
        {
          btnText: 'Reject',
          positionClass: 'right',
          btnClass: 'btn-outline mr2',
          type: 'reject'
        },
      ],
    }
    this.openApproveOrRejectPopup(dialogData)
  }

  RejectInstituteCCTV(event: any){
    const dialogData = {
      controls: [
        {
          controlLable: 'Enter IP address',
          controlName: 'IPaddress',
          controlType: 'input',
          placeholder: 'Type here',
          value: event.ipAddress,
          validators: ['required'],
          disabled: true
        },{
          controlLable: 'Enter remarks',
          controlName: 'remarks',
          controlType: 'textArea',
          placeholder: 'Type here',
          value: '',
          validators: []
        },
      ],
      buttons: [
        {
          btnText: 'Cancel',
          positionClass: 'left',
          btnClass: 'btn-outline',
          type: 'close'
        },
        {
          btnText: 'Reject',
          positionClass: 'right',
          btnClass: 'btn-full',
          type: 'reject'
        },
      ],
    }
    this.openApproveOrRejectPopup(dialogData)
  }

  openApproveOrRejectPopup(dialogData: any) {
    const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
      data: dialogData,
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh'
    })

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
        const formBody = {
          ipAddress: response.form.IPaddress,
          remarks: response.form.remarks,
          status: response.type
        }
        this.updateCCTVstatus(formBody)
      }
    })
  }

  updateCCTVstatus(formBody: any) {
    if (formBody) {
      //add loader
      this.baseService.updateCCTVstatus$(formBody)
      .subscribe((res: any) => {
        if (res) {
          this.getInstitutesCCTVtableData();
        }
      })
    }
  }
  //#endregion

  assignAlternateInstitute(event: any) {

    this.getNearestInstitutesList(event)
    
    let nearestInstitutesList = [
      {
        displayName: 'ABC Nursing College',
        id: '1'
      },{
        displayName: 'Agra Paramedical Collgege',
        id: '2'
      },{
        displayName: 'Agra Nursing College',
        id: '3'
      },{
        displayName: 'XYZ Agra',
        id: '4'
      },
    ]
    const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
      data: {
        controls: [
          {
            controlLable: 'Institute District',
            controlName: 'instituteDistrict',
            controlType: 'input',
            placeholder: 'Type here',
            value: 'Agra',
            validators: ['required'],
            readonly: true
          },{
            controlLable: 'Near Institute List',
            controlName: 'institute',
            controlType: 'select',
            optionsList: nearestInstitutesList,
            value: null,
            placeholder: 'Select the Institute',
            validators: ['required'],
          },
        ],
        buttons: [
          {
            btnText: 'Cancel',
            positionClass: 'left',
            btnClass: 'btn-outline',
            type: 'close'
          },
          {
            btnText: 'Assign',
            positionClass: 'right',
            btnClass: 'btn-full',
            type: 'assign'
          },
        ],
      },
      width: '700px',
      maxWidth: '90vw',
      maxHeight: '90vh'
    })
    dialogRef.afterClosed().subscribe((response: any) => {
      if (response) {
      }
    })
  }

  getNearestInstitutesList(event: any) {
    console.log(event)
    const formBody = {
      district: event.district,
    }
    this.baseService.getNearestInstitutesList(formBody)
    .pipe(mergeMap((res: any) => {
      return this.formatNearestInstitutesList(res)
    }))
    .subscribe((institutesList: any) => {
      if (institutesList) {
        let nearestInstitutesList = institutesList
        const dialogRef = this.dialog.open(CctvApprovalPopupComponent, {
          data: {
            controls: [
              {
                controlLable: 'Institute District',
                controlName: 'instituteDistrict',
                controlType: 'input',
                placeholder: 'Type here',
                value: 'Agra',
                validators: ['required'],
                readonly: true
              },{
                controlLable: 'Near Institute List',
                controlName: 'institute',
                controlType: 'select',
                optionsList: nearestInstitutesList,
                value: null,
                placeholder: 'Select the Institute',
                validators: ['required'],
              },
            ],
            buttons: [
              {
                btnText: 'Cancel',
                positionClass: 'left',
                btnClass: 'btn-outline',
                type: 'close'
              },
              {
                btnText: 'Assign',
                positionClass: 'right',
                btnClass: 'btn-full',
                type: 'assign'
              },
            ],
          },
          width: '700px',
          maxWidth: '90vw',
          maxHeight: '90vh'
        })
        dialogRef.afterClosed().subscribe((response: any) => {
          if (response) {
          }
        })
      }
    })
  }

  formatNearestInstitutesList(institutes: any) {
    const formattedInstitutesList: {
      id: number,
      instituteName: string,
      instituteCode: string,
    } [] = [];
    if (institutes && institutes.length) {
      institutes.forEach((institute: any) => {
        const formattedInstitute = {
          id: institute.institute.id,
          instituteName: institute.institute.instituteName,
          instituteCode: institute.institute.instituteCode
        }
        formattedInstitutesList.push(formattedInstitute)
      })
    }
    return formattedInstitutesList
  }

  cancel() {
    this.router.navigateByUrl('')
  }

}

