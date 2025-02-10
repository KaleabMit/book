import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePersonaldetailDto } from './dto/create-personaldetail.dto';
import { UpdatePersonaldetailDto } from './dto/update-personaldetail.dto';
import { Personaldetail } from './entities/personaldetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Post } from 'src/post/entities/post.entity';

@Injectable()
export class PersonaldetailsService {
  constructor(
    @InjectRepository(Personaldetail) private readonly repo: Repository<Personaldetail>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Post) private readonly postRepo: Repository<Post>,
  ) {}

  async create(createPersonaldetailDto: CreatePersonaldetailDto) {
    console.log('Service Method Input:', createPersonaldetailDto); // Log the input data
    const category = await this.categoryRepo.findOne({ where: { id: createPersonaldetailDto.categoryId } });
    const post = await this.postRepo.findOne({ where: { id: createPersonaldetailDto.postsId } });

    if (!category) {
      console.error('Category not found'); // Log the error detail
      throw new BadRequestException('Category not found');
    }

    if (!post) {
      console.error('Post not found'); // Log the error detail
      throw new BadRequestException('Post not found');
    }

    const personaldetail = this.repo.create(createPersonaldetailDto);
    personaldetail.category = category;
    personaldetail.posts = post;

    try {
      const result = await this.repo.save(personaldetail);
      console.log('Service Method Output:', result); // Log the output data
      return result;
    } catch (error) {
      console.error('Error saving personal detail:', error); // Log the error details
      throw new BadRequestException('Error saving personal detail');
    }
  }

  async findAll() {
    try {
      const result = await this.repo.find();
      return result;
    } catch (error) {
      console.error('Error fetching personal details:', error); // Log the error details
      throw new BadRequestException('Error fetching personal details');
    }
  }

  async findOne(id: number) {
    try {
      const personaldetail = await this.repo.findOne({ where: { id } });
      if (!personaldetail) {
        throw new BadRequestException('Personal detail not found');
      }
      return personaldetail;
    } catch (error) {
      console.error('Error fetching personal detail:', error); // Log the error details
      throw new BadRequestException('Error fetching personal detail');
    }
  }

  async update(id: number, updatePersonaldetailDto: UpdatePersonaldetailDto) {
    try {
      const personaldetail = await this.repo.preload({
        id: id,
        ...updatePersonaldetailDto,
      });
      if (!personaldetail) {
        throw new BadRequestException('Update failed');
      }
      return this.repo.save(personaldetail);
    } catch (error) {
      console.error('Error updating personal detail:', error); // Log the error details
      throw new BadRequestException('Error updating personal detail');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.repo.delete(id);
      if (result.affected === 0) {
        throw new BadRequestException('Delete failed');
      }
      return result;
    } catch (error) {
      console.error('Error deleting personal detail:', error); // Log the error details
      throw new BadRequestException('Error deleting personal detail');
    }
  }
}
