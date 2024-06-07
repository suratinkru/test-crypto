import { Controller, Get,  Param, Delete, Post, UseGuards, Body } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { CreateFavoriteDto } from './dto/create-favorite.dto';
// import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { request } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  // @Post()
  // create(@Body() createFavoriteDto: CreateFavoriteDto) {
  //   return this.favoritesService.create(createFavoriteDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Post()
  addFavorite(@Body() body: any) {
    return this.favoritesService.addFavorite(body,request);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('')
  getFavorites() {
    const user:any = request['user'];
    return this.favoritesService.getFavorites(user.sub);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
  //   return this.favoritesService.update(+id, updateFavoriteDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.remove(+id);
  }
}
