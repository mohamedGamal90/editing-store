import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { DataControlService } from '../data-control.service';
import { Item } from '../item.model';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit {
  itemForm!: FormGroup;
  Sizes: { name: string; select: boolean }[] = [
    { name: 'XS', select: false },
    { name: 'S', select: false },
    { name: 'M', select: false },
    { name: 'L', select: false },
    { name: 'XL', select: false },
    { name: 'XXL', select: false },
  ];
  sizes: string[] = [];
  id: number = -1;
  message: string = 'Save';
  editMode: boolean = false;
  item: Item = {
    header: '',
    imageUrl: '',
    brand: '',
    price: 0,
    description: '',
    size: this.sizes,
    category: '',
    itemID: Math.ceil(Date.now() + Math.random()),
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataControl: DataControlService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.editMode = this.id > -1 ? true : false;
      this.message = this.editMode ? 'Update' : 'Save';
      this.initailForm();
    });
  }

  onSubmit() {
    this.onCheckSubmit();
    if (this.editMode) {
      this.dataControl.editItemHandler(this.id, this.itemForm.value);
    } else {
      this.dataControl.addItemHandler(this.itemForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['/main']);
    this.itemForm.reset();
    this.sizes = [];
    this.editMode = false;
    this.id = -1;
    this.message = 'Save';
  }

  onCheckChange(event: any) {
    const name = event.target.value;
    const ischecked = event.target.checked;
    this.Sizes.map((Index) => {
      if (Index.name == name) {
        Index.select = ischecked;
        if (ischecked) {
          this.sizes.push(Index.name);
          return Index;
        }
        this.sizes.pop();
        return Index;
      }
      return Index;
    });
  }

  onCheckSubmit() {
    this.sizes = [];
    for (let index of this.Sizes) {
      if (index.select) {
        this.sizes.push(index.name);
      }
    }
    this.itemForm.value.size = this.sizes;
  }

  onCheckEdit(size: string[]) {
    for (var i = 0; i < size.length;) {
      this.Sizes.map((Index) => {
        if (Index.name === size[i]) {
          Index.select = true;
          this.sizes.push(size[i]);
          return i++;
        }
        return;
      });
    }
  }

  private initailForm() {
    let header = '';
    let imageUrl;
    let brand = '';
    let price = 0;
    let description = '';
    let size = this.sizes;
    let category = '';
    let itemID = Math.ceil(Date.now() + Math.random());

    if (this.editMode) {
      this.item = this.dataControl.returnOneItemHandler(this.id);
      header = this.item.header;
      imageUrl = this.item.imageUrl;
      brand = this.item.brand;
      price = this.item.price;
      description = this.item.description;
      size = this.item.size;
      category = this.item.category;
      itemID = this.item.itemID;
      this.onCheckEdit(size);
    }

    this.itemForm = new FormGroup({
      header: new FormControl(header, Validators.required),
      imageUrl: new FormControl(imageUrl, [
        Validators.required,
        Validators.pattern(/(https?:\/\/.*\.(?:png|jpg|jpeg))/),
      ]),
      brand: new FormControl(brand, Validators.required),
      price: new FormControl(price, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/),
      ]),
      description: new FormControl(description, Validators.required),
      size: new FormControl(size),
      category: new FormControl(category, Validators.required),
      itemID: new FormControl(itemID, Validators.required),
    });
  }
}
