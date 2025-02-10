import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
import { PersonaldetailsService } from './personaldetails.service';
import { CreatePersonaldetailDto } from './dto/create-personaldetail.dto';
import { UpdatePersonaldetailDto } from './dto/update-personaldetail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Response } from 'express';

@Controller('personaldetails')
export class PersonaldetailsController {
  constructor(private readonly personaldetailsService: PersonaldetailsService) {}

  @Post()
  async create(@Body() createPersonaldetailDto: CreatePersonaldetailDto) {
    console.log('Request Body:', createPersonaldetailDto); // Log the incoming request body
    try {
      const result = await this.personaldetailsService.create(createPersonaldetailDto);
      console.log('Response:', result); // Log the response from the service
      return result;
    } catch (error) {
      console.error('Error in create method:', error); // Log the error details
      throw new BadRequestException('Error creating personal details');
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.personaldetailsService.findAll();
      return result;
    } catch (error) {
      console.error('Error in findAll method:', error); // Log the error details
      throw new BadRequestException('Error fetching all personal details');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.personaldetailsService.findOne(+id);
      return result;
    } catch (error) {
      console.error('Error in findOne method:', error); // Log the error details
      throw new BadRequestException('Error fetching personal detail');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonaldetailDto: UpdatePersonaldetailDto) {
    try {
      const result = await this.personaldetailsService.update(+id, updatePersonaldetailDto);
      return result;
    } catch (error) {
      console.error('Error in update method:', error); // Log the error details
      throw new BadRequestException('Error updating personal detail');
    }
  }

  @Post('upload-photo')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const fileExtension = file.originalname.split('.')[1];
        const newFileName = `${name.split('').join('_')}_${Date.now()}.${fileExtension}`;
        cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|docx)$/)) {
        return cb(null, false);
      }
      cb(null, true);
    }
  }))
  async uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not an image.');
    } else {
      const response = {
        filepath: `http://localhost:5000/personaldetails/pictures/${file.filename}`,
      };
      return response;
    }
  }

  @Get('pictures/:filename')
  async getPicture(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = `./uploads/${filename}`;
    res.sendFile(filePath, { root: '.' });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.personaldetailsService.remove(+id);
    if (result.affected === 0) {
      throw new BadRequestException('Delete failed');
    }
    return { success: true };
  }
}
